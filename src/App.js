import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import HeaderNav from './components/HeaderNav/'

import Students from './scenes/Students/'
import StudentsForm from './scenes/Students/components/StudentsForm'
import Groups from './scenes/StudentGroups/'
import Home from './scenes/Home/'
import Calendar from './scenes/Calendar/'
import About from './scenes/About/'
import Messages from './scenes/Messages'
import Login from './scenes/Login'

import PrivateRoute from './components/PrivateRoute';

const NoMatch = () => (<div><h2>Error 404 </h2></div>)

const App = () => (

    <Router>
        <div>
            <HeaderNav />

            <Switch>
                <Route path="/login" component={Login} />

                <Route path="/logout" component={Login} />

                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/calendar" component={Calendar} />
                <PrivateRoute path="/messages" component={Messages} />
                <PrivateRoute exact path="/students" component={Students} />
                <PrivateRoute path="/students/new" component={StudentsForm} />
                <PrivateRoute path="/students/:studentId" component={StudentsForm} />
                <PrivateRoute exact path="/groups" component={Groups} />
                <PrivateRoute path="/about" component={About} />

                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>
)
export default App