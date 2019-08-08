import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import profileIcon from '../../user_icon.png';

import { Delete } from '@material-ui/icons';

import { fetchStudentById, makeEnrollment, deleteEnrollment } from "../../actions";
import { LinkContainer } from 'react-router-bootstrap'

import ConfirmModal from '../../../../components/ConfirmModal'
import { showError, showWarning, showInfo, showSuccess } from "../../../../components/AlertApp/actions"

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

      isConfirmModalOpened: false,
      idGroupDelete: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    await this.fetchStudent()
    await this.props.fetchStudentGroupList();

    const { studentDetails } = this.props
    const { id, fullname, email, phone } = studentDetails

    const group = studentDetails.studentGroups && studentDetails.studentGroups.length > 0 ? studentDetails.studentGroups[0].id : ""

    this.setState({
      id, fullname, email, phone, group
    })
  }


  fetchStudent = async () => {
    const studentId = this.props.match.params.studentId;
    await this.props.fetchStudentById(studentId);
  }

  handleSubmit = async () => {
    const { id, group } = this.state

    var student = { id }
    var studentGroup = { id: group }

    await this.props.makeEnrollment(student, studentGroup);
    this.props.showSuccess(`Enrollment successfully created.`)
    this.fetchStudent();

    this.setState({
      group: "",
    })
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

  handleConfirmDelete = async () => {
    await this.props.deleteEnrollment(this.state.idGroupDelete, this.state.id)
    this.props.showSuccess(`Enrollment successfully removed.`)
    this.setState({ idGroupDelete: null })
    this.togleConfirmModal();

    this.fetchStudent();
  }

  openConfirmModal = (group) => {
    this.setState({ idGroupDelete: group.id })
    this.togleConfirmModal();
  }

  togleConfirmModal = () => {
    this.setState({ isConfirmModalOpened: !this.state.isConfirmModalOpened })
  }

  render() {
    const { studentDetails, studentGroupList = [] } = this.props
    const { fullname, email, phone, group, isConfirmModalOpened } = this.state
    const { studentGroups } = studentDetails;

    var groupsFiltered = []
    let groupTable;

    const groupList = [];
    groupList.push(<option key="firstOpt" value=""> - SELECT - </option>)

    if (studentGroups && studentGroups.length > 0) {
      groupTable = studentGroups.map((g) =>
        <Row key={g.id}>
          <Col xs="10">
            {g.name}
          </Col>
          <Col>
            <Delete style={{ cursor: 'pointer', marginLeft: 10 }} onClick={() => this.openConfirmModal(g)} />
          </Col>
        </Row>
      );

      groupsFiltered = studentGroupList.filter(groupList => studentGroups.find(groupStudent => groupStudent.id === groupList.id) == null);
      groupsFiltered.forEach(gf => groupList.push(<option key={gf.id} value={gf.id}>{gf.name}</option>));

    } else {

      studentGroupList.forEach(gf => groupList.push(<option key={gf.id} value={gf.id}>{gf.name}</option>));
    }

    return (
      <Container >

        <ConfirmModal
          isOpen={isConfirmModalOpened}
          title="Confirm"
          text="Are you sure you want to remove this course?"
          handleToggleModal={this.togleConfirmModal}
          handleConfirm={this.handleConfirmDelete}
        />

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
                        value={fullname} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="txtPhone">Phone</label>
                    <div>
                      <input id="txtPhone" name="phone" type="text" placeholder="" className="form-control input-md"
                        value={phone} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="txtEmail">Email</label>
                    <div>
                      <input id="txtEmail" name="email" type="text" placeholder="" className="form-control input-md"
                        value={email} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label" htmlFor="sltGroup">Course</label>
                    <div >

                      <Row>
                        <Col xs="10" >
                          <Input type="select" name="group" id="sltGroup" onChange={this.handleInputChange} value={group}>
                            {groupList}
                          </Input>
                        </Col>
                        <Col xs="2"  >
                          <Button id="btnSave"
                            onClick={this.handleSubmit}
                            name="btnSave" color="primary">
                            +
                            </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="form-group">
                    {groupTable}
                  </div>

                  <Row >
                    <Col>
                      <LinkContainer to="/students">
                        <Button id="btnCancel" name="btnCancel" color="secondary" >Back</Button>
                      </LinkContainer>

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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStudentById, makeEnrollment, deleteEnrollment, fetchStudentGroupList,
  showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudentsForm);

