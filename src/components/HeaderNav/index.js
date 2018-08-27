import React from 'react'
import logo from './logo_msa.png';
import { LinkContainer } from 'react-router-bootstrap'

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';

export default class Example extends React.Component {
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
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    <img src={logo} alt='Mindroom Student App' />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav className="ml-auto" navbar>
                        <LinkContainer exact to="/">
                            <NavLink >Home</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/calendar">
                            <NavLink >Calendar</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/notification">
                            <NavLink >Notification</NavLink>
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
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
