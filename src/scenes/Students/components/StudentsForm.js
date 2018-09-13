import React, { Component } from 'react';
import profileIcon from '../user_icon.png';


var config = require('../../../config/config');

const GROUP_STUDENTS_URL = '/groupStudents';

class StudentsForm extends Component {

  /*
   Constructor 
  */
  constructor(props) {
    super(props);
    this.state = {
      student: {
      }
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;

    fetch(config.backend.students + "/" + studentId)
      .then(resp => resp.json())
      .then(student => {
        this.setState({ student: student })
      })
      .catch(function (err) {
        console.log(err)
      });


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

      <div className="container">
        <div className="row">
          <div className="col-sm">
            <legend>Student Detail - </legend>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <img width="300px" src={profileIcon} alt='Profile' />
          </div>

          <div className="col-sm">

            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <fieldset>


                <div className="form-group">
                  <label className="control-label" htmlFor="txtName">Name</label>
                  < div >
                    <input id="txtName" name="txtName" type="text" placeholder="" className="form-control input-md" required=""
                      value={this.state.student.name} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="txtPhone">Phone</label>
                  <div>
                    <input id="txtPhone" name="txtPhone" type="text" placeholder="" className="form-control input-md"
                      value={this.state.phone} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="txtAddress">Address</label>
                  <div>
                    <input id="txtAddress" name="txtAddress" type="text" placeholder="" className="form-control input-md"
                      value={this.state.address} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="txtEmail">Email</label>
                  <div>
                    <input id="txtEmail" name="txtEmail" type="text" placeholder="" className="form-control input-md"
                      value={this.state.email} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="sltGroup">Couses</label>
                  <div >
                    <select id="sltGroup" name="sltGroup" className="form-control">
                      <option value="1">UA60315 – Advanced Diploma of Graphic Design</option>
                      <option value="2">CT50615 – Diploma of Website Development</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="btnSave">Save</label>
                  <div className="col-md-8">
                    <button id="btnSave" name="btnSave" className="btn btn-success">Save</button>
                    <button id="btnCancel" name="btnCancel" className="btn btn-danger">Cancel</button>
                  </div>
                </div>

              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentsForm;