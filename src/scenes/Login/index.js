import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import SpinnerModal from '../../components/SpinnerModal';
import LoginForm from './components/LoginForm'

import { login, logout } from "./actions";

import { Redirect } from 'react-router-dom';
import AlertBox from '../../components/AlertBox';

class LoginScreen extends Component {

    componentWillMount() {
        this.props.logout()
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
        if (isAuthenticated) { return <Redirect to="/" /> }

        if (isFetching) { return <SpinnerModal /> }
        return (

            <div>
                <AlertBox error={error} />
                <LoginForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.loginReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ login, logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);