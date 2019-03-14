import React from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import HeaderNav from './components/HeaderNav/'

import Students from './scenes/Students/'
import StudentsForm from './scenes/Students/components/StudentsForm'
import Groups from './scenes/StudentGroups/'
import Home from './scenes/Home/'
import Calendar from './scenes/Calendar/'
import About from './scenes/About/'

const Notification = () => (<div><h2>Notification</h2></div>)


const NoMatch = () => (<div><h2>Error 404 </h2></div>)

const App = () => (
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

                <Route path="/about" component={About} />

                <Route component={NoMatch} />
            </Switch>
        </div>

    </Router>
)
export default App