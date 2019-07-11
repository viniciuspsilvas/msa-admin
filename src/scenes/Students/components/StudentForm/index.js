import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import profileIcon from '../../user_icon.png';

import { fetchStudentById, saveStudent } from "../../actions";

import { fetchStudentGroupList } from "../../../StudentGroups/actions";

class StudentsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
      id: null,
      fullname: "",
      phone: "",
      email: "",
      course: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const studentId = this.props.match.params.studentId;
    await this.props.fetchStudentById(studentId);
    await this.props.fetchStudentGroupList();

    const { studentDetails } = this.props
    const { id, fullname, email, phone } = studentDetails

    this.setState({
      id, fullname, email, phone
    })
  }

  handleSubmit = async () => {


    const { id, fullname, email, phone } = this.state

    await this.props.saveStudent({ id, fullname, email, phone });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    const { studentGroupList = [] } = this.props
    const { fullname, email, phone } = this.state

    const groupList = studentGroupList.map((group) =>
      <option key={group.id}>{group.name}</option>
    );

    return (
      <Container >
        <h1>Student Details</h1>

        <Paper elevation={1} style={{ padding: 1 + 'em' }} >
          <Row className="align-items-center">
            <Col xs="6" style={{ textAlign: "center" }}>
              <img width="300px" src={profileIcon} alt='Profile' />
            </Col>

            <Col xs="6">
              <Form className="form-horizontal" >
                <fieldset>
                  <div className="form-group">
                    <label className="control-label" htmlFor="txtName">Name</label>
                    < div >
                      <input id="txtName" name="fullname" type="text" placeholder="" className="form-control input-md"
                        value={fullname} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="txtPhone">Phone</label>
                    <div>
                      <input id="txtPhone" name="phone" type="text" placeholder="" className="form-control input-md"
                        value={phone} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="txtEmail">Email</label>
                    <div>
                      <input id="txtEmail" name="email" type="text" placeholder="" className="form-control input-md"
                        value={email} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="sltGroup">Course</label>
                    <div >
                      <Input type="select" name="group" id="sltGroup" onChange={this.handleInputChange}>
                        {groupList}
                      </Input>
                    </div>
                  </div>

                  <Row >
                    <Col style={{ textAlign: "right" }} >
                      <Button id="btnCancel" name="btnCancel" color="secondary">Back</Button>
                    </Col>
                    <Col xs="2" style={{ textAlign: "right" }} >
                      <Button id="btnSave"
                        onClick={this.handleSubmit}
                        name="btnSave" color="primary">
                        Save
                        </Button>
                    </Col>
                  </Row>
                </fieldset>
              </Form>
            </Col>
          </Row>
        </Paper >
      </Container>
    );
  }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.studentReducer, studentGroupList: state.studentGroupReducer.studentGroupList });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchStudentById, saveStudent, fetchStudentGroupList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudentsForm);

