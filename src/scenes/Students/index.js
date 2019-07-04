import React, { Component } from 'react';
import { fetchStudentList, sendNotification } from "./actions";
import { connect } from "react-redux";

import StudentList from './components/StudentsList'
import ModalMessage from '../../components/ModalMessage'
import SpinnerModal from '../../components/SpinnerModal';

import { Container } from 'reactstrap';

class Students extends Component {

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

        // Prepare data to be sent to backend
        var { title, body, severity, receivers, datetime, isSendNow } = this.state

        if (isSendNow) datetime = null;
        let data = { title, body, severity, receivers, datetime }

        this.props.sendNotification(data);
        this.togleModalMessage();
        this.resetForm();
    }

    // Called always when a input is changed
    handleInputChange = (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleChangeDate = (selectedDates) => {
        this.setState({ datetime: selectedDates });
    }

    resetForm = () => {
        this.setState({
            receivers: [],
            title: '',
            body: '',
            severity: '',
            datetime: null
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            receivers: [],
            title: '',
            body: '',
            severity: '',
            modalOpen: false,
            isSendNow: true,
            datetime: null
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

    render() {
        const { error, loading, studentList } = this.props;
        const { receivers, modalOpen, isSendNow } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Students</h1>

                <StudentList studentList={studentList} openModalMessage={this.openModalMessage} />

                <ModalMessage
                    isOpen={modalOpen}
                    isSendNow={isSendNow}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.togleModalMessage}
                    studentList={studentList.filter(s => s.advices.length > 0)}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}

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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudentList: () => dispatch(fetchStudentList()),
        sendNotification: (data) => dispatch(sendNotification(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);