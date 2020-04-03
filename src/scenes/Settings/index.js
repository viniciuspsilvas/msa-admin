import React from 'react';
import { Container } from 'reactstrap';
import SpinnerModal from '../../components/SpinnerModal';

import Paper from '@material-ui/core/Paper';

import {
    Switch,
    Route,
    NavLink,
    useRouteMatch
} from "react-router-dom";

import Users from '../../scenes/Users/components/UserForm';
import ListUsers from '../../scenes/Users/components/ListUsers';

export default function Settings() {

    let { path, url } = useRouteMatch();

    const { error, loading } = {}//this.props;

    if (error) { return <div>Error! {error.message}</div> }
    if (loading) { return <SpinnerModal /> }

    return (
        <Container >
            <h1>Settings</h1>
            <Paper elevation={1} style={{ padding: 1 + 'em' }} >

                <div className="row">
                    <div className="col-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <NavLink to={`${url}/users`}>Users</NavLink>
                            <NavLink to={`${url}/rendering`}>Moodle</NavLink>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <Switch>
                                <Route exact path={path}>
                                    <span>Please select a setting.</span>
                                </Route>

                                <Route exact path={`${path}/users`}>
                                    <ListUsers />
                                </Route>

                                <Route path={`${path}/users/newUser/:id`}>
                                    <Users />
                                </Route>

                                <Route path={`${path}/users/newUser`}>
                                    <Users />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>

            </Paper>
        </Container >
    );
}