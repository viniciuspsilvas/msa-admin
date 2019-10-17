import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { fetchStudentGroupList, createStudentGroup, deleteStudentGroup, resetStudentGroup } from "./actions";
import { sendNotification } from "../Students/actions";

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

import { Container } from 'reactstrap';

import AlertBox from '../../components/AlertBox'
import StudentGroupsList from './components/StudentGroupsList'
import GroupFormModal from './components/GroupFormModal'
import ConfirmModal from '../../components/ConfirmModal'
import ModalMessage from '../../components/ModalMessage'
import ListStudentsModal from './components/ListStudentsModal'

import Paper from '@material-ui/core/Paper';

import SpinnerModal from '../../components/SpinnerModal';

import './style.css';
import { Button } from 'reactstrap';

const INITIAL_STATE = {
    id: null,
    name: '',
    description: '',
    modalOpen: false,
    confirmOpen: false,
    isListStudentsModalOpen: false,

    modalMessageOpen: false,
    receivers: [],
    title: '',
    body: '',
    severity: '',
    isSendNow: true,
    datetime: Date.now(),
    isEditing: false,

    groupSelected: {
        enrollments: [],
        description: ""
    },

    errors: {
        title: 'Required!',
        body: 'Required!',
        receivers: '',
        message: ''
    }
}

class StudentGroups extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.togleModal = this.togleModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.openModalMessage = this.openModalMessage.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.openListStudentsModal = this.openListStudentsModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchStudentGroupList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.error === null && this.props.studentGroup.id !== null) {
            this.props.fetchStudentGroupList();
            this.props.resetStudentGroup();
        }
    }

    resetForm = () => {
        this.setState(INITIAL_STATE);
    }

    handleMessageSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            // Prepare data to be sent to backend
            var { title, body, severity, receivers, datetime, isSendNow } = this.state

            var studentsList = []
            receivers.forEach(group => {
                if (group.enrollments.length > 0) {
                    studentsList = studentsList.concat(group.enrollments.map(s => s))
                }
            });

            if (isSendNow) datetime = null; // Don't send datetime
            let data = { title, body, severity, receivers: studentsList, datetime }

            this.setState({ errors: { message: '' } })
            if (studentsList && studentsList.length > 0) {
                this.props.sendNotification(data);
                this.props.showSuccess(`Message successfully sent.`)
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
            this.state.receivers.length === 0
                ? 'At least one receiver must be selected.'
                : '';

        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    openConfirmModal = ({ _id }) => {
        this.setState({ idDelete: _id })
        this.togleConfirmModal();
    }

    togleConfirmModal = () => {
        this.setState({ confirmOpen: !this.state.confirmOpen })
    }


    togleListStudentsModal = () => {
        this.setState({ isListStudentsModalOpen: !this.state.isListStudentsModalOpen })
    }

    // Open Modal Message
    openModalMessage = (groupSelected) => {
        // Create a new array with the param studentSelected as the unique element.
        this.setState({ receivers: [groupSelected] })
        this.togleModalMessage();
    }

    openListStudentsModal = (groupSelected) => {
        this.setState({ groupSelected: groupSelected })
        this.togleListStudentsModal();
    }

    handleConfirmDelete = async () => {
        await this.props.deleteStudentGroup(this.state.idDelete)
        this.setState({ idDelete: null })
        this.togleConfirmModal();

        this.props.showSuccess(`Course successfully deleted.`)
        this.props.fetchStudentGroupList();
    }

    // Open or close the modal
    togleModal = () => {
        this.resetForm();
        this.setState({ modalOpen: !this.state.modalOpen })
    };

    openEditModal = ({ _id, name, description }) => {
        this.togleModal();
        this.setState({ _id, name, description, isEditing: true });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to backend
        var { name, description, _id } = this.state
        await this.props.createStudentGroup({ name, description, _id: _id })

        this.props.showSuccess(`${name} successfully saved.`)
        this.togleModal();
        this.resetForm();
    }

    handleChangeDate = (selectedDates) => {

        this.setState({ datetime: selectedDates });
    }

    handleChangeReceiver = (selected) => {
        this.setState({ receivers: selected });
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
        const { error, loading, studentGroupList } = this.props; // TODO change studentGroupList to enrollments
        const { modalOpen, name, description, isEditing,
            confirmOpen, isListStudentsModalOpen, groupSelected } = this.state;
        const { datetime, receivers, modalMessageOpen, isSendNow,
            errors /*  <= Error validation */ } = this.state;

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

                <ListStudentsModal course={groupSelected.description}
                    isOpen={isListStudentsModalOpen}
                    handleToggleModal={this.togleListStudentsModal}
                    studentList={groupSelected.enrollments} />

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
                    handleChangeReceiver={this.handleChangeReceiver}
                    errors={errors}
                />

                <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                    <StudentGroupsList list={studentGroupList}
                        openModalMessage={this.openModalMessage}
                        openEditModal={this.openEditModal}
                        openConfirmModal={this.openConfirmModal}
                        openListStudentsModal={this.openListStudentsModal} />

                    <div style={{ textAlign: 'right', marginRight: 19 }} >
                        <Button color="primary" onClick={this.togleModal}>New</Button>
                    </div>

                </Paper>

            </Container>
        );
    }
}


//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.studentGroupReducer,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStudentGroupList, createStudentGroup, deleteStudentGroup, sendNotification,
    showError, showWarning, showInfo, showSuccess, resetStudentGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudentGroups);