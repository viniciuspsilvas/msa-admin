import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import logo from './logo_msa.png';
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from "../../scenes/Login/actions";

import {
    Collapse, Navbar, NavbarToggler,
    NavbarBrand, Nav, NavLink, Button
} from 'reactstrap';

class HeaderNav extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {

        const { isAuthenticated } = this.props;

        return (

            <Navbar color="light" light expand="md">

                <NavbarBrand href="/">
                    <img src={logo} alt='Mindroom Student App' />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {
                        isAuthenticated &&
                        <Nav className="ml-auto" navbar>
                            <LinkContainer exact to="/">
                                <NavLink >Home</NavLink>
                            </LinkContainer>
                            <LinkContainer to="/calendar">
                                <NavLink >Calendar</NavLink>
                            </LinkContainer>
                            <LinkContainer to="/messages">
                                <NavLink >Messages</NavLink>
                            </LinkContainer>
                            <LinkContainer to="/students">
                                <NavLink >Students</NavLink>
                            </LinkContainer>
                            <LinkContainer to="/groups">
                                <NavLink >Groups</NavLink>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <NavLink >About</NavLink>
                            </LinkContainer>
                            <Button color="link" onClick={this.props.logout}>Logout</Button>
                        </Nav>
                    }
                </Collapse>
            </Navbar>
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
        logout
    },
    dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);