import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStudentGroupList, createStudentGroup, deleteStudentGroup } from "./actions";
import { Container } from 'reactstrap';

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
            datetime: null
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
            datetime: null
        });
    }


    handleMessageSubmit = () => {

        // TODO continuar do envio de messagem
        // front sera responsavel por montar a lista de student de todos os grupos antes de enviar para o backend
        // Consultar todos os estudantes do grupo selecionado
        console.log("### handleMessageSubmit")

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
        console.log("##### handleConfirmDelete ", this.state.idDelete)

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
        this.setState({ id, name, description });
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
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    togleModalMessage = () => this.setState({ modalMessageOpen: !this.state.modalMessageOpen });

    render() {
        const { error, loading, studentGroupList } = this.props;
        const { modalOpen, name, description, editing, confirmOpen } = this.state;
        const { receivers, modalMessageOpen, isSendNow } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Group Students</h1>

                <GroupFormModal handleSubmit={this.handleFormSubmit}
                    handleChange={this.handleInputChange}
                    handleToggleModal={this.togleModal}
                    isOpen={modalOpen}
                    name={name}
                    description={description}
                    isEditing={editing}
                />

                <ConfirmModal
                    isOpen={confirmOpen}
                    title="Confirm"
                    text="Are you sure you want to delete this group?"
                    handleToggleModal={this.togleConfirmModal}
                    handleConfirm={this.handleConfirmDelete}
                />

                <ModalMessage
                    isOpen={modalMessageOpen}
                    isSendNow={isSendNow}
                    handleSubmit={this.handleMessageSubmit}
                    handleCancel={this.togleModalMessage}
                    groupList={studentGroupList}
                    receivers={receivers}
                    handleInputChange={this.handleInputChange}
                    handleChangeDate={this.handleChangeDate}

                />

                <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                    <StudentGroupsList list={studentGroupList}
                        openModalMessage={this.openModalMessage}
                        openEditModal={this.openEditModal}
                        openConfirmModal={this.openConfirmModal} />

                    <Button color="primary" onClick={this.togleModal}>New</Button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentGroups);