import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { fetchMessageList, deleteMessage } from "./actions";
import Paper from '@material-ui/core/Paper';
import { Container, Button } from 'reactstrap';

import ModalMessage from '../../components/ModalMessage'
import MessagesList from "./components/MessagesList"
import ConfirmModal from '../../components/ConfirmModal'
import SpinnerModal from '../../components/SpinnerModal';
import TitleAction from '../../components/TitleAction'

import { showError, showWarning, showInfo, showSuccess } from "../../components/AlertApp/actions"

class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            idMessageRemove: "",
            modalMessageOpen: false,
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

    toggleModalMessage = () => this.setState({ modalMessageOpen: !this.state.modalMessageOpen });

    render() {
        const { error, loading, messageList } = this.props;
        const { isOpen, modalMessageOpen } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        return (
            <>
                {loading && <SpinnerModal />}
                <ConfirmModal
                    isOpen={isOpen}
                    title="Confirm"
                    text="Are you sure you want to remove this message?"
                    handleToggleModal={this.handleToggleModal}
                    handleConfirm={this.handleConfirm}
                />

                <ModalMessage
                    isOpen={modalMessageOpen}
                    toggle={this.toggleModalMessage}
                    callback={this.props.fetchMessageList}
                />

                <Container >
                    <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                        <TitleAction title="Messages">
                            <Button color="primary" onClick={this.toggleModalMessage}>New</Button>
                        </TitleAction>

                        <MessagesList list={messageList} openConfirmDeleteModal={(row) => this.openConfirmDeleteModal(row)} />
                    </Paper>
                </Container>
            </>
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