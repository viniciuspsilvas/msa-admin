import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { logout } from "../../scenes/Login/actions";
import { Button } from 'reactstrap';

class LogoutButton extends Component {
    render() {  return(<Button color="link" onClick={this.props.logout}>Logout</Button>) }
}

//Redux configuration
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(null, mapDispatchToProps)(LogoutButton);