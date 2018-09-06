import React, { Component } from 'react';

import MobileUserList from './components/MobileUserList'

import './style.css';

const BACKEND_URL = 'http://localhost:3001';
const MESSAGE_URL = '/message';

class Students extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            mobileUsersList: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(BACKEND_URL + MESSAGE_URL)
            .then(resp => resp.json())
            .then(mobileUsersList => {
                this.setState({ mobileUsersList: mobileUsersList })
            })
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.value);
        var data = {
            value: this.state.value
        }
        console.log(data)
        fetch(BACKEND_URL + MESSAGE_URL, {
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
        const studentList = this.state.mobileUsersList;
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
                    (<MobileUserList mobileUserList={studentList} />)
                    :
                    (<div> Empty list </div>)
                }
            </div>
        );
    }
}

export default Students;