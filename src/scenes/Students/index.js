import React, { Component } from 'react';

import StudentsList from './components/StudentsList'

import './style.css';

var config = require('../../config/config');

class Students extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            studentList: []
        };

       // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // List students
        fetch(config.backend.students)
            .then(resp => resp.json())
            .then(studentList => {
                console.log(studentList)
                //this.setState({ studentList: studentList })
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        const studentList = this.state.studentList;
        const isNotEmpty = studentList && studentList.length > 0;

        return (
            <div className='tc'>
                <div><h2>Students</h2></div>
                <form >
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {isNotEmpty ?
                    (<StudentsList studentList={studentList} />)
                    :
                    (<div> Empty list </div>)
                }
            </div>
        );
    }
}

export default Students;