import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStudentGroupList, createStudentGroup, deleteStudentGroup } from "./actions";
import { sendNotification } from "../Students/actions";

import { Container } from 'reactstrap';

import AlertBox from '../../components/AlertBox'
import StudentGroupsList from './components/StudentGroupsList'
import GroupFormModal from './components/GroupFormModal'
import ConfirmModal from '../../components/ConfirmModal'
import ModalMessage from '../../components/ModalMessage'

import Paper from '@material-ui/core/Paper';

import { createLoadingSelector } from '../../redux/selectors';
import SpinnerModal from '../../components/SpinnerModal';


import './style.css';
import { Button } from 'reactstrap';

class StudentGroups extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
            description: '',
            modalOpen: false,
            confirmOpen: false,

            modalMessageOpen: false,
            receivers: [],
            title: '',
            body: '',
            severity: '',
            isSendNow: true,
            datetime: Date.now(),
            isEditing: false,

            errors: {
                title: 'Required!',
                body: 'Required!',
                receivers: '',
                message: ''
            }
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.togleModal = this.togleModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.openModalMessage = this.openModalMessage.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchStudentGroupList();
    }

    resetForm = () => {
        this.setState({
            id: null,
            name: '',
            description: '',
            modalOpen: false,
            confirmOpen: false,

            modalMessageOpen: false,
            receivers: [],
            title: '',
            body: '',
            severity: '',
            isSendNow: true,
            datetime: Date.now(),
            isEditing: false,

            errors: {
                title: 'Required!',
                body: 'Required!',
                receivers: '',
                message: ''
            }
        });
    }


    handleMessageSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            // Prepare data to be sent to backend
            var { title, body, severity, receivers, datetime, isSendNow } = this.state

            var studentsList = []
            receivers.forEach(group => {
                if (group.students.length > 0) {
                    studentsList = studentsList.concat(group.students.map(s => s))
                }
            });

            if (isSendNow) datetime = null; // Don't send datetime
            let data = { title, body, severity, receivers: studentsList, datetime }

            this.setState({ errors: { message: '' } })
            if (studentsList && studentsList.length > 0) {
                this.props.sendNotification(data);
            } else {
                this.setState({ errors: { message: "There is no student in this group." } })
            }

            this.togleModalMessage();
            this.resetForm();
        } else {
            alert('ATTENTION: \rRequired fields must be filled in.')
        }
    }

    validateForm = (errors) => {
        let valid = true;
        errors.receivers =
            this.state.receivers.length == 0
                ? 'At least one receiver must be selected.'
                : '';

        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    openConfirmModal = ({ id }) => {
        this.setState({ idDelete: id })
        this.togleConfirmModal();
    }

    togleConfirmModal = () => {
        this.setState({ confirmOpen: !this.state.confirmOpen })
    }

    // Open Modal Message
    openModalMessage = (groupSelected) => {
        // Create a new array with the param studentSelected as the unique element.
        this.setState({ receivers: [groupSelected] })
        this.togleModalMessage();
    }

    handleConfirmDelete = async () => {
        await this.props.deleteStudentGroup(this.state.idDelete)
        this.setState({ idDelete: null })
        this.togleConfirmModal();

        this.props.fetchStudentGroupList();
    }

    // Open or close the modal
    togleModal = () => {
        this.resetForm();
        this.setState({ modalOpen: !this.state.modalOpen })
    };

    openEditModal = ({ id, name, description }) => {
        this.togleModal();
        this.setState({ id, name, description, isEditing: true });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to backend
        var { name, description, id } = this.state
        await this.props.createStudentGroup({ name, description, id })

        this.togleModal();
        this.resetForm();
        this.props.fetchStudentGroupList();
    }

    handleChangeDate = (selectedDates) => {

        this.setState({ datetime: selectedDates });
    }

    handleInputChange = (event) => {
        event.preventDefault();

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let errors = this.state.errors;

        switch (name) {
            case 'title':
                errors.title =
                    value.length < 5
                        ? 'Title must be 5 characters long!'
                        : '';
                break;
            case 'body':
                errors.body =
                    value.length < 5
                        ? 'Body must be 5 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    togleModalMessage = () => this.setState({ modalMessageOpen: !this.state.modalMessageOpen });

    render() {
        const { error, loading, studentGroupList } = this.props;
        const { modalOpen, name, description, isEditing, confirmOpen } = this.state;
        const { datetime, receivers, modalMessageOpen, isSendNow, errors /*  <= Erro de validacao */ } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        if (errors.message) return <AlertBox error={errors} />

        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Courses </h1>

                <GroupFormModal handleSubmit={this.handleFormSubmit}
                    handleChange={this.handleInputChange}
                    handleToggleModal={this.togleModal}
                    isOpen={modalOpen}
                    name={name}
                    description={description}
                    isEditing={isEditing}
                />

                <ConfirmModal
                    isOpen={confirmOpen}
                    title="Confirm"
                    text="Are you sure you want to delete this group?"
                    handleToggleModal={this.togleConfirmModal}
                    handleConfirm={this.handleConfirmDelete}
                />

                <ModalMessage
                    datetime={datetime}
                    isOpen={modalMessageOpen}
                    isSendNow={isSendNow}
                    handleSubmit={this.handleMessageSubmit}
                    handleCancel={this.togleModalMessage}
                    groupList={studentGroupList}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}
                    errors={errors}
                />

                <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                    <StudentGroupsList list={studentGroupList}
                        openModalMessage={this.openModalMessage}
                        openEditModal={this.openEditModal}
                        openConfirmModal={this.openConfirmModal} />

                    <div style={{textAlign: 'right', marginRight: 19 }} >
                        <Button color="primary"onClick={this.togleModal}>New</Button>
                    </div>

                </Paper>

            </Container>
        );
    }
}

const loadingSelector = createLoadingSelector(['GET_TODOS']);

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.studentGroupReducer,
        isFetching: loadingSelector(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudentGroupList: () => dispatch(fetchStudentGroupList()),
        createStudentGroup: (studentGroup) => dispatch(createStudentGroup(studentGroup)),
        deleteStudentGroup: (id) => dispatch(deleteStudentGroup(id)),
        sendNotification: (data) => dispatch(sendNotification(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentGroups);