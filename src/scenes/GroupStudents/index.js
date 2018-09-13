import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'

import GroupStudentsList from './components/GroupStudentsList'

import './style.css';

var config = require('../../config/config');

class GroupStudents extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);
        this.state = {
            groupStudentList: []
        };

    }

    componentDidMount() {
        // List students
        fetch(config.backend.groupStudents)
            .then(resp => resp.json())
            .then(groupStudentList => {
                this.setState({ groupStudentList: groupStudentList })
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    render() {
        const groupStudentList = this.state.groupStudentList;
        const isNotEmpty = groupStudentList && groupStudentList.length > 0;

        return (
            <div className='tc'>

                <LinkContainer to="/groups/new">
                    <Button color="primary">New Group</Button>
                </LinkContainer>


                {isNotEmpty ?
                    (<GroupStudentsList groupstudentList={groupStudentList} />)
                    :
                    (<div> Empty list </div>)
                }
            </div>
        );
    }
}

export default GroupStudents;