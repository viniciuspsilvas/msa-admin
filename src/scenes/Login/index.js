import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from "./actions";
import { bindActionCreators } from 'redux'

import SpinnerModal from '../../components/SpinnerModal';
import LoginForm from './components/LoginForm'

class LoginScreen extends Component {

    /**
     * Call from the Button
     */
    handleSubmit = values => {
        /**
         * That's it! No need to specify event.preventDefault(). 
         * All that's left to do is handle the dispatched form data in your reducer.
         */
        this.props.login(values)
    }

    render() {
        const { error, loading, userDetails } = this.props;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <div>
                {userDetails && "Token id: " + userDetails.id}
                <LoginForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.loginReducer
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        login
    },
    dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);