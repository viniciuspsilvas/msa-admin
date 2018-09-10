import React, { Component } from 'react';

var config = require('../../../config/config');

const GROUP_STUDENTS_URL = '/groupStudents';

class GroupStudentsForm extends Component {

  /*
   Constructor 
  */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /* 
  *   Method called by Submit button
  */
  handleSubmit(event) {
    event.preventDefault();
    alert('A group Student was submitted: ' + this.state.name);
    var data = {
      name: this.state.name,
      description: this.state.description,
    }

    fetch(config.backend_url + GROUP_STUDENTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      if (data === "success") {
        this.refs.msg.show('Some text or component', {
          time: 2000,
          type: 'success',
          icon: <img alt='Img icon' src="path/to/some/img/32x32.png" />
        })

        this.componentDidMount();
      }
    }).catch(function (err) {
      console.log(err)
    });
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />

        </label>
        <label>
          Description:
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />

        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default GroupStudentsForm;