import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { Container } from 'reactstrap';
import { fetchStudentList, activeStudent } from "./actions";

import StudentList from './components/StudentsList'
import ModalMessage from '../../components/ModalMessage_NEW'
import SpinnerModal from '../../components/SpinnerModal';
import AlertBox from '../../components/AlertBox'
import ConfirmModal from '../../components/ConfirmModal'

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

const initialState = {
    receivers: [],
    modalOpen: false,
    listSelectedStudents: [],
    activeSelectedStudents: false,
    isOpenActiveStudentConfirmModal: false,
}

class Students extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;

        //Binds
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
        const { modalOpen, isOpenActiveStudentConfirmModal } = this.state;

        
        if (error) { return <AlertBox error={error} /> }
        
        return (
            <Container >
                
                <h1>Students</h1>

                <ModalMessage
                    isOpen={modalOpen}
                    toggle={this.toggleModalMessage}
                    onSend={this.onSend}
                    isLoading={loading}
                />

                { loading && <SpinnerModal /> }

                <StudentList studentList={studentList}
                    openModalMessage={this.openModalMessage}
                    handleSelectActionChange={this.handleSelectActionChange}
                    handleOnSelect={this.handleOnSelect}
                    listSelectedStudents={this.state.listSelectedStudents}
                    handleOnSelectAll={this.handleOnSelectAll}
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
    fetchStudentList, activeStudent,
    showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Students);