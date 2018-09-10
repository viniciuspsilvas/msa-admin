import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import HeaderNav from './components/HeaderNav/'

import Students from './scenes/Students/'
import Groups from './scenes/GroupStudents/'
import GroupsForm from './scenes/GroupStudents/components/GroupStudentsForm'


const Home = () => (<div><h2>Home</h2></div>)
const Calendar = () => (<div><h2>Calendar</h2></div>)
const Notification = () => (<div><h2>Notification</h2></div>)
const About = () => (<div><h2>About</h2></div>)

const BasicExample = () => (
    <Router>
        <div>
            <HeaderNav />

            <Route exact path="/" component={Home} />

            <Route path="/calendar" component={Calendar} />
            <Route path="/notification" component={Notification} />
            <Route path="/students" component={Students} />
           
            <Route exact path="/groups" component={Groups} />
            <Route path="/groups/new " component={GroupsForm} />
            
            <Route path="/about" component={About} />

        </div>

    </Router>
)
export default BasicExample