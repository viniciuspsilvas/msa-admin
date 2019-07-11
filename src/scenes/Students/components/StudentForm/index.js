import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'reactstrap';
import profileIcon from '../../user_icon.png';

import { fetchStudentById } from "../../actions";

import { fetchStudentById } from "../../../StudentGroups/actions";


class StudentsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {}
    };
  }

  async componentDidMount() {
    const studentId = this.props.match.params.studentId;
    await this.props.fetchStudentById(studentId);
  }

  render() {
    const { studentDetails } = this.props
    const { fullname, email, phone } = studentDetails

    return (
      <Container >
        <h1>Student Details</h1>

        <Paper elevation={1} style={{ padding: 1 + 'em' }} >
          <Row className="align-items-center">
            <Col xs="6" style={{ textAlign: "center" }}>
              <img width="300px" src={profileIcon} alt='Profile' />
            </Col>

            <Col xs="6">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className="form-group">
                    <label className="control-label" htmlFor="txtName">Name</label>
                    < div >
                      <input id="txtName" name="txtName" type="text" placeholder="" className="form-control input-md" required=""
                        value={fullname} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="txtPhone">Phone</label>
                    <div>
                      <input id="txtPhone" name="txtPhone" type="text" placeholder="" className="form-control input-md"
                        value={phone} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="txtEmail">Email</label>
                    <div>
                      <input id="txtEmail" name="txtEmail" type="text" placeholder="" className="form-control input-md"
                        value={email} onChange={this.handleChange} />
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

                  <Row style={{ marginRight: 7 }} >
                    <Col style={{ textAlign: "right" }} >
                      <button id="btnCancel" name="btnCancel" className="btn btn-danger">Cancel</button>
                    </Col>
                    <Col xs="2" style={{ textAlign: "right" }} >
                      <button id="btnSave" name="btnSave" className="btn btn-primary">Save</button>
                    </Col>
                  </Row>
                </fieldset>
              </form>
            </Col>
          </Row>
        </Paper >
      </Container>
    );
  }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.studentReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchStudentById }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudentsForm);

