import React from 'react';

import logo from './logo_msa.png';
import { LinkContainer } from 'react-router-bootstrap'
import LogoutButton from '../LogoutButton'

import {
    Navbar, NavbarBrand, Nav, NavLink
} from 'reactstrap';

import './style.css';

const HeaderNav = (props) => {

    const { isAuthenticated } = props;
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} alt='Mindroom Student App' />
            </NavbarBrand>

            {
                isAuthenticated &&
                <Nav className="ml-auto" navbar>
                    <LinkContainer exact to="/">
                        <NavLink >Home</NavLink>
                    </LinkContainer>
                    {/*          <LinkContainer to="/calendar">
                        <NavLink>Calendar</NavLink>
                    </LinkContainer> */}
                    <LinkContainer to="/messages" >
                        <NavLink>Messages</NavLink>
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

                    <Nav className="ml-auto navbar-right" navbar >
                        <LogoutButton />
                    </Nav>
                </Nav>
            }
        </Navbar>
    );
}

export default HeaderNav;