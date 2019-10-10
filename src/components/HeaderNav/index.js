import React from 'react';

import logo from './logo_msa.png';
import LogoutButton from '../LogoutButton'

import {
    Navbar, NavbarBrand, Nav
} from 'reactstrap';

import { NavLink } from 'react-router-dom'

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
                    <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/messages">Messages</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/students">Students</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/courses">Courses</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>

                    <Nav className="ml-auto navbar-right" navbar >
                        <LogoutButton />
                    </Nav>
                </Nav>
            }
        </Navbar>
    );
}

export default HeaderNav;