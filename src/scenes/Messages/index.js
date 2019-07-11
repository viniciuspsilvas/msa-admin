import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchMessageList } from "./actions";
import { Container } from 'reactstrap';

import MessagesList from "./components/MessagesList"
import ConfirmModal from '../../components/ConfirmModal'
import SpinnerModal from '../../components/SpinnerModal';

class Messages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            msgResend: {}
        }

        //this.handleToggleModal = this.handleToggleModal.bind(this);
        //this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentDidMount() {
        this.props.fetchMessageList();
    }

    handleSendNotif = (msg) => {
        this.handleToggleModal();
        this.setState({ msgResend: msg })
    }

    handleToggleModal = () => {
        this.setState({ 
            isOpen: !this.state.isOpen ,
            msgResend: {}
        })
    }

    handleConfirm = () => {
        window.alert("handleConfirm" + this.state.msgResend.id)
        this.handleToggleModal();
    }

    render() {
        const { error, loading, messageList } = this.props;
        const { isOpen } = this.state;

        if (error) { return <div>Error! {error.message}</div> }

        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Messages</h1>
                <MessagesList list={messageList} handleSendNotif={(msg) => this.handleSendNotif(msg)} />
               
                <ConfirmModal
                    isOpen={isOpen}
                    title="Confirm"
                    text="Are you sure you want to resend this notification?"
                    handleToggleModal={this.handleToggleModal}
                    handleConfirm={this.handleConfirm}
                />

            </Container>
        );
    }
}


//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.messagesReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessageList: () => dispatch(fetchMessageList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);