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
import ListStudentsModal from './components/ListStudentsModal'
import ModalMessage from '../../components/ModalMessage'

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
        this.toggleModal = this.toggleModal.bind(this);
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

    resetForm = () => {
        this.setState(INITIAL_STATE);
    }

    handleMessageSubmit = async (e) => {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            // Prepare data to be sent to backend
            var { title, body, severity, receivers, datetime, isSendNow } = this.state

            var studentsList = []
            receivers.forEach(group => {
                if (group.enrollments.length > 0) {
                    studentsList = studentsList.concat(group.enrollments.map(s => { return s.isActive ? s : null }))
                }
            });

            if (isSendNow) datetime = null; // Don't send datetime
            let data = { title, body, severity, receivers: studentsList, datetime }

            if (studentsList && studentsList.length > 0) {
                await this.props.sendNotification(data);
                this.props.showSuccess(`Message successfully sent.`)
                this.toggleModalMessage();
                this.resetForm();
            } else {
                this.props.showWarning(`There is no student in the selected group(s).`)
            }

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
        this.toggleConfirmModal();
    }

    toggleConfirmModal = () => {
        this.setState({ confirmOpen: !this.state.confirmOpen })
    }


    toggleListStudentsModal = () => {
        this.setState({ isListStudentsModalOpen: !this.state.isListStudentsModalOpen })
    }

    // Open Modal Message
    openModalMessage = (groupSelected) => {
        // Create a new array with the param studentSelected as the unique element.
        this.setState({ receivers: [groupSelected] })
        this.toggleModalMessage();
    }

    openListStudentsModal = (groupSelected) => {
        this.setState({ groupSelected: groupSelected })
        this.toggleListStudentsModal();
    }

    handleConfirmDelete = async () => {
        const data = await this.props.deleteStudentGroup(this.state.idDelete)

        this.setState({ idDelete: null })
        this.toggleConfirmModal();

        if (!data.errors) {
            this.props.showSuccess(`Course successfully deleted.`)
            this.props.fetchStudentGroupList();
        }
    }

    // Open or close the modal
    toggleModal = () => {
        this.resetForm();
        this.setState({ modalOpen: !this.state.modalOpen })
    };

    openEditModal = ({ _id, name, description }) => {
        this.toggleModal();
        this.setState({ _id, name, description, isEditing: true });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to backend
        var { name, description, _id } = this.state
        const data = await this.props.createStudentGroup({ name, description, _id: _id })

        if (!data.errors) {
            this.props.showSuccess(`${name} successfully saved.`)
            this.props.fetchStudentGroupList();
            this.toggleModal();
            this.resetForm();
        }
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

    toggleModalMessage = () => this.setState({ modalMessageOpen: !this.state.modalMessageOpen });

    render() {
        const { error, loading, courseList } = this.props; // TODO change courseList to enrollments

        const { modalOpen, name, description, isEditing,
            confirmOpen, isListStudentsModalOpen, groupSelected } = this.state;

        const { datetime, receivers, modalMessageOpen, isSendNow,
            errors /*  <= Error validation */ } = this.state;

        if (loading) { return <SpinnerModal /> }
        if (error) { return <AlertBox error={error} /> }

        return (

            <Container >
                <h1>Courses </h1>

                <GroupFormModal handleSubmit={this.handleFormSubmit}
                    handleChange={this.handleInputChange}
                    handleToggleModal={this.toggleModal}
                    isOpen={modalOpen}
                    name={name}
                    description={description}
                    isEditing={isEditing}
                />

                <ListStudentsModal course={groupSelected.description}
                    isOpen={isListStudentsModalOpen}
                    handleToggleModal={this.toggleListStudentsModal}
                    studentList={groupSelected.enrollments} />

                <ConfirmModal
                    isOpen={confirmOpen}
                    title="Confirm"
                    text="Are you sure you want to delete this group?"
                    handleToggleModal={this.toggleConfirmModal}
                    handleConfirm={this.handleConfirmDelete}
                />

                <ModalMessage
                    datetime={datetime}
                    isOpen={modalMessageOpen}
                    isSendNow={isSendNow}
                    handleSubmit={this.handleMessageSubmit}
                    handleCancel={this.toggleModalMessage}
                    groupList={courseList}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}
                    handleChangeReceiver={this.handleChangeReceiver}
                    errors={errors}
                />

                <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                    <StudentGroupsList list={courseList}
                        openModalMessage={this.openModalMessage}
                        openEditModal={this.openEditModal}
                        openConfirmModal={this.openConfirmModal}
                        openListStudentsModal={this.openListStudentsModal} />

                    <div style={{ textAlign: 'right', marginRight: 19 }} >
                        <Button color="primary" onClick={this.toggleModal}>New</Button>
                    </div>
                </Paper>
            </Container>
        );
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.studentGroupReducer });

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStudentGroupList, createStudentGroup, deleteStudentGroup, sendNotification,
    showError, showWarning, showInfo, showSuccess, resetStudentGroup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudentGroups);