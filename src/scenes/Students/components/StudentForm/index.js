import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import profileIcon from '../../../../images/user_icon.png';

import { Delete } from '@material-ui/icons';

import SpinnerModal from '../../../../components/SpinnerModal';

import { fetchStudentById, makeEnrollment, deleteEnrollment } from "../../actions";
import { Link } from 'react-router-dom'

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
      course: "",

      isConfirmModalOpened: false,
      idEnrollDelete: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentWillMount() {
    const studentDetails = await this.fetchStudent();
    await this.props.fetchStudentGroupList();

    //const { studentDetails } = this.props
    const { _id, fullname, email, phone } = studentDetails
    const course = studentDetails.enrollments && studentDetails.enrollments.length > 0 ? studentDetails.enrollments[0].course : ""

    this.setState({
      id: _id, fullname, email, phone, course
    })
  }


  fetchStudent = async () => {
    const studentId = this.props.match.params.studentId;
    return await this.props.fetchStudentById(studentId);
  }

  handleSubmit = async () => {
    const { id, course } = this.state

    try {

      if (!course) {
        this.props.showWarning(`A course should be selected.`)
        return
      }

      var student = { _id: id }

      await this.props.makeEnrollment(student, { _id: course });
      await this.fetchStudent();
      this.props.showSuccess(`Enrollment successfully created.`)

    } catch (error) {
      this.props.showError(error)
    } finally {
      this.setState({ course: "" })
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const { courseList = [] } = this.props

    let value;
    switch (target.type) {
      case 'checkbox':
        value = target.checked
        break;
      case 'select-one':

        const course = courseList.find(s => s._id === target.value)

        if (course)
          value = course._id
        break;
      default:
        value = target.value
    }

    const name = target.name;
    this.setState({ [name]: value });
  }

  handleConfirmDelete = async () => {

    try {
      this.toggleConfirmModal();
      await this.props.deleteEnrollment(this.state.idEnrollDelete);
      await this.fetchStudent();
      this.props.showSuccess(`Enrollment successfully removed.`)

    } catch (error) {
      this.props.showError(error)
    } finally {
      this.setState({ idEnrollDelete: null })
    }

  }

  openConfirmModal = (_id) => {
    this.setState({ idEnrollDelete: _id })
    this.toggleConfirmModal();
  }

  toggleConfirmModal = () => {
    this.setState({ isConfirmModalOpened: !this.state.isConfirmModalOpened })
  }

  render() {
    const { loading, studentDetails, courseList = [] } = this.props
    const { fullname, email, phone, course, isConfirmModalOpened } = this.state
    const { enrollments } = studentDetails;

    var groupsFiltered = []
    let groupTable;

    const groupList = [];
    groupList.push(<option key="firstOpt" value=""> - SELECT - </option>)

    if (enrollments && enrollments.length > 0) {
      groupTable = enrollments.map((enroll) =>
        <Row key={enroll.course._id}>
          <Col xs="10">
            {enroll.course.name}
          </Col>
          <Col>
            <Delete style={{ cursor: 'pointer', marginLeft: 10 }} onClick={() => this.openConfirmModal(enroll._id)} />
          </Col>
        </Row>
      );

      groupsFiltered = courseList.filter(groupList => enrollments.find(e => e.course._id === groupList._id) == null);
      groupsFiltered.forEach(gf => groupList.push(<option key={gf._id} value={gf._id}>{gf.name}</option>));

    } else {
      courseList.forEach(gf => groupList.push(<option key={gf._id} value={gf._id}>{gf.name}</option>));
    }

    return (

      <Container >

        {loading && <SpinnerModal />}

        <ConfirmModal
          isOpen={isConfirmModalOpened}
          title="Confirm"
          text="Are you sure you want to remove this course?"
          handleToggleModal={this.toggleConfirmModal}
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
                    <div>
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
                          <Input type="select" name="course" id="sltGroup" onChange={this.handleInputChange} value={course}>
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

                      <Link to="/students">
                        <Button id="btnCancel" name="btnCancel" color="secondary" >Back</Button>
                      </Link>

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
const mapStateToProps = state => ({ ...state.studentReducer, courseList: state.studentGroupReducer.courseList });

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStudentById, makeEnrollment, deleteEnrollment, fetchStudentGroupList,
  showError, showWarning, showInfo, showSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudentsForm);

