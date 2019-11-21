import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Container } from 'reactstrap';
import { fetchStudentList, sendNotification } from "./actions";

import StudentList from './components/StudentsList';
import SpinnerModal from '../../components/SpinnerModal';
import ModalMessage from '../../components/ModalMessage';

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions";

const initialState = {
    receivers: [],
    title: '',
    body: '',
    modalOpen: false,
    isSendNow: true,
    datetime: Date.now(),
    listSelectedStudents: [],
    errors: {
        title: 'Required!',
        body: 'Required!',
        receivers: ''
    }
}

class Students extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;

        //Binds
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.togleModalMessage = this.togleModalMessage.bind(this);
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
        this.togleModalMessage();
    }

    // Open or close the modal
    togleModalMessage = () => this.setState({ modalOpen: !this.state.modalOpen });

    // Handle of Send button
    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            // Prepare data to be sent to backend
            var { title, body, receivers, datetime, isSendNow } = this.state

            if (isSendNow) datetime = null; // Don't send datetime
            let message = { title, body, students: receivers, scheduledFor: datetime }

            await this.props.sendNotification(message);
            this.props.showSuccess(`Message successfully sent.`)
            this.togleModalMessage();
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
            case "MAKE_ENROLLMENT":
                this.makeEnrollment();
                break;
            case "ACTIVE_STUDENTS":
            case "INACTIVE_STUDENTS":
                this.toggleStudentsActive();
                break;
            default:
                return;
        }
    }

    makeEnrollment = () => {
        console.log("makeEnrollment total: ", this.state.listSelectedStudents.length);

        // TODO continuar aqui - Exibir popup de confirmacao e selecao do curso.
    }

    toggleStudentsActive = () => {
        console.log("toggleStudentsActive total: ", this.state.listSelectedStudents.length);

        // TODO continuar aqui - Exibir popup de confirmacao
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

    resetForm = () => {
        this.setState(initialState);
    }

    render() {
        const { error, loading, studentList } = this.props;
        const { receivers, modalOpen, isSendNow, errors, datetime } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

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
                    handleCancel={this.togleModalMessage}
                    studentList={studentList.filter(s => s.device != null)}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}
                    handleChangeReceiver={this.handleChangeReceiver}
                    errors={errors}
                />

            </Container>
        )
    }
}

//Redux configuration
const mapStateToProps = state => {
    return ({
        ...state.studentReducer,
    });
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStudentList, sendNotification,
    showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Students);