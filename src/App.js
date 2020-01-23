import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import { connect } from "react-redux";

import HeaderNav from './components/HeaderNav'
import AlertApp from './components/AlertApp'
import Students from './scenes/Students/'
import StudentsForm from './scenes/Students/components/StudentForm'
import Groups from './scenes/StudentGroups/'
import Home from './scenes/Home/'
import Messages from './scenes/Messages'
import Login from './scenes/Login'
import Settings from './scenes/Settings'
import PrivateRoute from './components/PrivateRoute';

const NoMatch = () => (<div><h2>Error 404 </h2></div>)

 class App extends Component {
    render() {
        const { isAuthenticated } = this.props;

        return (
            <Router>
                <div>
                    <HeaderNav isAuthenticated={isAuthenticated} />
                    <AlertApp />

                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Login} />

                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute path="/messages" component={Messages} />
                        <PrivateRoute exact path="/students" component={Students} />
                        <PrivateRoute path="/students/new" component={StudentsForm} />
                        <PrivateRoute path="/students/:studentId" component={StudentsForm} />
                        <PrivateRoute exact path="/courses" component={Groups} />
                        <PrivateRoute path="/settings" component={Settings} />

                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>)
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.loginReducer });

export default connect(mapStateToProps)(App);