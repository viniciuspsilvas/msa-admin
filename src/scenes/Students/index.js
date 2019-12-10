import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { Container } from 'reactstrap';
import { fetchStudentList, sendNotification, activeStudent } from "./actions";

import StudentList from './components/StudentsList'
import ModalMessage from '../../components/ModalMessage'
import SpinnerModal from '../../components/SpinnerModal';
import AlertBox from '../../components/AlertBox'
import ConfirmModal from '../../components/ConfirmModal'

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

const initialState = {
    receivers: [],
    title: '',
    body: '',
    modalOpen: false,
    isSendNow: true,
    datetime: Date.now(),
    listSelectedStudents: [],
    activeSelectedStudents: false,

    errors: {
        title: 'Required!',
        body: 'Required!',
        receivers: ''
    },

    isOpenActiveStudentConfirmModal: false,
}

class Students extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;

        //Binds
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.toggleModalMessage = this.toggleModalMessage.bind(this);
        this.openModalMessage = this.openModalMessage.bind(this);
        this.handleSelectActionChange = this.handleSelectActionChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchStudentList();
    }

    // Open Modal Message
    openModalMessage = (studentSelected) => {
        // Create a new array with the param studentSelected as the unique element.
        this.setState({ receivers: [studentSelected] })
        this.toggleModalMessage();
    }

    // Open or close the modal
    toggleModalMessage = () => this.setState({ modalOpen: !this.state.modalOpen });

    // Handle of Send button
    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            // Prepare data to be sent to backend
            var { title, body, receivers, datetime, isSendNow } = this.state

            if (isSendNow) datetime = null; // Don't send datetime
            let message = { title, body, students: receivers, scheduledFor: new Date(datetime).toISOString() }

            await this.props.sendNotification(message);
            this.props.showSuccess(`Message successfully sent.`)
            this.toggleModalMessage();
            this.resetForm();
        } else {
            alert('ATTENTION: \rRequired fields must be filled in.')
        }

    }

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

    // Called always when a input is changed
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
                        ? 'Title must be 5 characters long!' : '';
                break;
            case 'body':
                errors.body =
                    value.length < 5
                        ? 'Body must be 5 characters long!' : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleChangeDate = (selectedDates) => {
        this.setState({ datetime: selectedDates }); // TODO adicionar validacao de data aqui
    }

    handleChangeReceiver = (selected) => {
        this.setState({ receivers: selected });
    }

    handleSelectActionChange = (event) => {

        switch (event.target.value) {
            case "ACTIVE_STUDENTS":
                this.setState({ activeSelectedStudents: true });
                this.toggleActiveStudentConfirmModal();
                break;
            case "INACTIVE_STUDENTS":

                this.setState({ activeSelectedStudents: false });
                this.toggleActiveStudentConfirmModal();
                break;
            default:
                return;
        }
    }

    confirmToggleStudentActive = async () => {
        const { activeSelectedStudents, listSelectedStudents } = this.state;

        this.toggleActiveStudentConfirmModal();
        await this.props.activeStudent(listSelectedStudents, activeSelectedStudents);
        await this.props.fetchStudentList();
        this.resetForm();
        this.props.showSuccess(`Student successfully updated.`)
    }

    handleOnSelect = (row, isSelect) => {

        if (isSelect) {
            this.setState(() => ({
                listSelectedStudents: [...this.state.listSelectedStudents, row._id]
            }));
        } else {
            this.setState(() => ({
                listSelectedStudents: this.state.listSelectedStudents.filter(x => x !== row._id)
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r._id);
        if (isSelect) {
            this.setState(() => ({
                listSelectedStudents: ids
            }));
        } else {
            this.setState(() => ({
                listSelectedStudents: []
            }));
        }
    }

    resetForm = () => { this.setState(initialState); }

    toggleActiveStudentConfirmModal = () => {
        this.setState({ isOpenActiveStudentConfirmModal: !this.state.isOpenActiveStudentConfirmModal })
    }

    render() {
        const { error, loading, studentList } = this.props;
        const { receivers, modalOpen, isSendNow, errors, datetime, isOpenActiveStudentConfirmModal } = this.state;

        if (loading) { return <SpinnerModal /> }
        if (error) { return <AlertBox error={error} /> }

        return (
            <Container >
                <h1>Students</h1>

                <StudentList studentList={studentList}
                    openModalMessage={this.openModalMessage}
                    handleSelectActionChange={this.handleSelectActionChange}
                    handleOnSelect={this.handleOnSelect}
                    listSelectedStudents={this.state.listSelectedStudents}
                    handleOnSelectAll={this.handleOnSelectAll}
                />

                <ModalMessage
                    datetime={datetime}
                    isOpen={modalOpen}
                    isSendNow={isSendNow}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.toggleModalMessage}
                    studentList={studentList.filter(s => s.device != null)}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}
                    handleChangeReceiver={this.handleChangeReceiver}
                    errors={errors}
                />

                <ConfirmModal
                    isOpen={isOpenActiveStudentConfirmModal}
                    title="Confirm"
                    text="Confirm this operation?"
                    handleToggleModal={this.toggleActiveStudentConfirmModal}
                    handleConfirm={this.confirmToggleStudentActive}
                />

            </Container>
        )
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.studentReducer });

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStudentList, sendNotification, activeStudent,
    showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Students);