import React, { Component } from 'react';

import {
    hideMessage,
    SHOW_INFO_MESSAGE,
    SHOW_ERROR_MESSAGE,
    SHOW_WARNING_MESSAGE,
    SHOW_SUCCESS_MESSAGE
} from "./actions";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { Alert } from 'reactstrap';

class AlertApp extends Component {

    render() {
        const { type, description, isShowing } = this.props;

        var color = "";
        switch (type) {
            case SHOW_INFO_MESSAGE:
                color = "info"
                break;

            case SHOW_ERROR_MESSAGE:
                color = "danger"
                break;

            case SHOW_WARNING_MESSAGE:
                color = "warning"
                break;

            case SHOW_SUCCESS_MESSAGE:
                color = "success"
                break;
            default:
                color = "";
        }

        if (isShowing) {
            return (
                <Alert color={color}
                    className="box"
                    isOpen={isShowing}
                    toggle={this.props.hideMessage}>
                    {description}
                </Alert>
            );
        } else {
            return null
        }
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.alertAppReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ hideMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AlertApp);