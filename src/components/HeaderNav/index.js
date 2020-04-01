import React, { useState } from 'react';

import logo from './logo_msa.png';
import LogoutButton from '../LogoutButton'

import {
    Navbar, NavbarBrand, Nav, Collapse, NavbarToggler
} from 'reactstrap';

import { NavLink } from 'react-router-dom'

import './style.css';

const HeaderNav = (props) => {

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const { isAuthenticated } = props;
    return (
        <Navbar color="light" light expand="md" style={{marginBottom:'30px'}}>
            <NavbarBrand href="/">
                <img src={logo} alt='Mindroom Student App' />
            </NavbarBrand>

            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>

            {
                isAuthenticated &&
                <Nav className="ml-auto" navbar>
                    <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/messages">Messages</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/students">Students</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/courses">Courses</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="/settings">Settings</NavLink>

                    <Nav className="ml-auto navbar-right" navbar >
                        <LogoutButton />
                    </Nav>
                </Nav>
            }

            </Collapse>
        </Navbar>
    );
}

export default HeaderNav;