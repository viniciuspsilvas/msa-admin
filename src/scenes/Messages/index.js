import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { fetchMessageList, deleteMessage } from "./actions";
import { Container } from 'reactstrap';

import MessagesList from "./components/MessagesList"
import ConfirmModal from '../../components/ConfirmModal'
import SpinnerModal from '../../components/SpinnerModal';

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

class Messages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            idMessageRemove: ""
        }
    }

    componentDidMount() {
        this.props.fetchMessageList();
    }

    openConfirmDeleteModal = (msg) => {
        this.handleToggleModal();
        this.setState({ idMessageRemove: msg._id })
    }

    handleToggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            idMessageRemove: ""
        })
    }

    handleConfirm = async () => {
        const data = await this.props.deleteMessage(this.state.idMessageRemove)

        this.setState({ idMessageRemove: null })
        this.handleToggleModal();

        if (!data.errors) {
            this.props.showSuccess(`Message successfully deleted.`)
            this.props.fetchMessageList();
        }
    }

    render() {
        const { error, loading, messageList } = this.props;
        const { isOpen } = this.state;

        if (error) { return <div>Error! {error.message}</div> }

        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Messages</h1>
                <MessagesList list={messageList} openConfirmDeleteModal={(row) => this.openConfirmDeleteModal(row)} />

                <ConfirmModal
                    isOpen={isOpen}
                    title="Confirm"
                    text="Are you sure you want to remove this message?"
                    handleToggleModal={this.handleToggleModal}
                    handleConfirm={this.handleConfirm}
                />

            </Container>
        );
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.messagesReducer });

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMessageList, deleteMessage,
    showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Messages);