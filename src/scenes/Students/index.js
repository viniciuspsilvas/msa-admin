import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { Container } from 'reactstrap';
import { fetchStudentList, sendNotification } from "./actions";

import StudentList from './components/StudentsList'
import ModalMessage from '../../components/ModalMessage'
import SpinnerModal from '../../components/SpinnerModal';

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

class Students extends Component {

    constructor(props) {
        super(props);

        this.state = {
            receivers: [],
            title: '',
            body: '',
            modalOpen: false,
            isSendNow: true,
            datetime: Date.now(),

            errors: {
                title: 'Required!',
                body: 'Required!',
                receivers: ''
            }
        };

        //Binds
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.togleModalMessage = this.togleModalMessage.bind(this);
        this.openModalMessage = this.openModalMessage.bind(this);
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
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            // Prepare data to be sent to backend
            var { title, body, receivers, datetime, isSendNow } = this.state

            if (isSendNow) datetime = null; // Don't send datetime
            let data = { title, body, receivers, datetime }

            this.props.sendNotification(data);

            this.props.showSuccess(`Message successfully sent.`)
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

        console.log("### selectedDates",selectedDates)
        //moment.tz TODO implementar timezone

        this.setState({ datetime: selectedDates }); // TODO adicionar validacao de data aqui
    }

    resetForm = () => {
        this.setState({
            receivers: [],
            title: '',
            body: '',
            modalOpen: false,
            isSendNow: true,
            datetime: Date.now(),

            errors: {
                title: '',
                body: '',
                receivers: ''
            }
        });
    }

    render() {
        const { error, loading, studentList } = this.props;
        const { receivers, modalOpen, isSendNow, errors, datetime } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Students</h1>

                <StudentList studentList={studentList} openModalMessage={this.openModalMessage} />

                <ModalMessage
                    datetime={datetime}
                    isOpen={modalOpen}
                    isSendNow={isSendNow}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.togleModalMessage}
                    studentList={studentList.filter(s => s.advices.length > 0)}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}
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
    fetchStudentList,sendNotification ,
    showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Students);