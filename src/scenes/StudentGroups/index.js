import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { fetchStudentGroupList, createStudentGroup, deleteStudentGroup, resetStudentGroup } from "./actions";
import { sendNotification } from "../Students/actions";

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

import { Container } from 'reactstrap';

import AlertBox from '../../components/AlertBox'
import StudentGroupsList from './components/StudentGroupsList'

import StudentGroupsListCopy from './components/StudentGroupsList copy'

import GroupFormModal from './components/GroupFormModal'
import ConfirmModal from '../../components/ConfirmModal'
import ListStudentsModal from './components/ListStudentsModal'
import ModalMessage from '../../components/ModalMessage'
import SpinnerModal from '../../components/SpinnerModal';

import './style.css';

const INITIAL_STATE = {
    course: {
        id: null,
        name: '',
        description: '',
        active: null,
    },

    modalOpen: false,
    confirmOpen: false,
    isListStudentsModalOpen: false,

    modalMessageOpen: false,
    receivers: [],
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
        this.openModalMessage = this.openModalMessage.bind(this);
        this.openListStudentsModal = this.openListStudentsModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchStudentGroupList();
    }

    resetForm = () => {
        this.setState(INITIAL_STATE);
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

    openEditModal = (course) => {
        console.log("#### course", course)
        this.toggleModal();
        this.setState({ course, isEditing: true });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();
        var { course } = this.state

        if (course._id == null) {
            course.active = true
        }

        const data = await this.props.createStudentGroup(course)

        if (!data.errors) {
            await this.props.fetchStudentGroupList();
            this.props.showSuccess(`${course.name} successfully saved.`)
            this.toggleModal();
            this.resetForm();
        }
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

        var { course } = this.state
        course[name] = value;

        this.setState({ errors, course });
    }

    toggleModalMessage = () => this.setState({ modalMessageOpen: !this.state.modalMessageOpen });

    render() {
        const { error, loading, courseList } = this.props; // TODO change courseList to enrollments

        const { modalOpen, course, isEditing,
            confirmOpen, isListStudentsModalOpen, groupSelected,
            modalMessageOpen } = this.state;

        if (error) { return <AlertBox error={error} /> }

        return (
            <>
                {loading && <SpinnerModal />}
                <GroupFormModal handleSubmit={this.handleFormSubmit}
                    handleChange={this.handleInputChange}
                    handleToggleModal={this.toggleModal}
                    isOpen={modalOpen}
                    course={course}
                    isEditing={isEditing}
                />

                <ListStudentsModal course={groupSelected.description}
                    isOpen={isListStudentsModalOpen}
                    handleToggleModal={this.toggleListStudentsModal}
                    enrollments={groupSelected.enrollments} />

                <ConfirmModal
                    isOpen={confirmOpen}
                    title="Confirm"
                    text="Are you sure you want to delete this group?"
                    handleToggleModal={this.toggleConfirmModal}
                    handleConfirm={this.handleConfirmDelete}
                />

                <ModalMessage
                    isOpen={modalMessageOpen}
                    toggle={this.toggleModalMessage}
                    to="Course"
                />

                <Container >
                    <StudentGroupsList list={courseList}
                        openModalMessage={this.openModalMessage}
                        openEditModal={this.openEditModal}
                        openConfirmModal={this.openConfirmModal}
                        openListStudentsModal={this.openListStudentsModal} />


                    <StudentGroupsListCopy list={courseList}
                        openModalMessage={this.openModalMessage}
                        openEditModal={this.openEditModal}
                        openConfirmModal={this.openConfirmModal}
                        openListStudentsModal={this.openListStudentsModal} />


                    {
                        courseList.map(c => <span key="{c.name}">{c.name} - {c.active + ""}</span>)
                    }
                </Container>
            </>
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