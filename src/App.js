import React from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import HeaderNav from './components/HeaderNav/'

import Students from './scenes/Students/'
import StudentsForm from './scenes/Students/components/StudentsForm'

import Groups from './scenes/GroupStudents/'
import GroupsForm from './scenes/GroupStudents/components/GroupStudentsForm'



const Home = () => (<div><h2>Home</h2></div>)
const Calendar = () => (<div><h2>Calendar</h2></div>)
const Notification = () => (<div><h2>Notification</h2></div>)
const About = () => (<div><h2>About</h2></div>)

const NoMatch = () => (<div><h2>Error 404 </h2></div>)

const BasicExample = () => (
    <Router>
        <div>
            <HeaderNav />

            <Switch>
                <Route exact path="/" component={Home} />

                <Route path="/calendar" component={Calendar} />
                <Route path="/notification" component={Notification} />

                <Route exact path="/students" component={Students} />
                <Route path="/students/new" component={StudentsForm} />
                <Route path="/students/:studentId" component={StudentsForm} />

                <Route exact path="/groups" component={Groups} />
                <Route path="/groups/new" component={GroupsForm} />

                <Route path="/about" component={About} />

                <Route component={NoMatch} />
            </Switch>
        </div>

    </Router>
)
export default BasicExample