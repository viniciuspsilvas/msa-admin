import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import profileIcon from '../../user_icon.png';

import { fetchStudentById, saveStudent } from "../../actions";
import { LinkContainer } from 'react-router-bootstrap'

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
      group: "",
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

    const group = studentDetails.studentGroups && studentDetails.studentGroups.length > 0 ? studentDetails.studentGroups[0].id : ""

    this.setState({
      id, fullname, email, phone, group
    })
  }

  handleSubmit = async () => {
    const { id, fullname, email, phone, group } = this.state

    await this.props.saveStudent({ id, fullname, email, phone, studentGroup: {id : group} }); // TODO check
  }

  handleInputChange = (e) => {
    const target = e.target;
    const { studentGroupList = [] } = this.props

    let value;
    switch (target.type) {
      case 'checkbox':
        value = target.checked
        break;
      case 'select-one':
        value = studentGroupList.find(s => s.id == target.value).id
        break;
      default:
        value = target.value
    }

    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    const { studentGroupList = [] } = this.props
    const { fullname, email, phone, group } = this.state

    const groupList = [];
    groupList.push(<option key="firstOpt" value=""> - SELECT - </option>)

    const list = studentGroupList.map((group) =>
      <option key={group.id} value={group.id}>{group.name}</option>
    );
    groupList.push(list)

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
                      <Input type="select" name="group" id="sltGroup" onChange={this.handleInputChange} value={group}>
                        {groupList}
                      </Input>
                    </div>
                  </div>

                  <Row >
                    <Col style={{ textAlign: "right" }} >
                      <LinkContainer to="/students">
                        <Button id="btnCancel" name="btnCancel" color="secondary" >Back</Button>
                      </LinkContainer>

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

