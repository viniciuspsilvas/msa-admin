import React, { Component } from 'react';

import StudentsList from './components/StudentsList'

import './style.css';

const BACKEND_URL = 'http://localhost:3001';
const STUDENTS_URL = '/students';

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // List students
        fetch(BACKEND_URL + STUDENTS_URL)
            .then(resp => resp.json())
            .then(studentList => {
                this.setState({ studentList: studentList })
            })
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    /* 
    *   Method called by Submit button
    */
    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.value);
        var data = {
            value: this.state.value
        }
        console.log(data)
        fetch(BACKEND_URL + STUDENTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            if (data === "success") {
                this.refs.msg.show('Some text or component', {
                    time: 2000,
                    type: 'success',
                    icon: <img alt='Img icon' src="path/to/some/img/32x32.png" />
                })
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const studentList = this.state.studentList;
        const isNotEmpty = studentList && studentList.length > 0;

        return (
            <div className='tc'>
                <form onSubmit={this.handleSubmit}>
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