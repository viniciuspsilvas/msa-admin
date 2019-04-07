import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import SpinnerModal from '../../components/SpinnerModal';
import LoginForm from './components/LoginForm'

import { login } from "./actions";

import { Redirect } from 'react-router-dom';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

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
        const { error, isFetching, isAuthenticated } = this.props;

        if (error) { return <div>Error! {error.message}</div> }
        if (isFetching) { return <SpinnerModal /> }

        if (isAuthenticated) {return <Redirect to="/" />}

        return (
            <LoginForm onSubmit={this.handleSubmit} />
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