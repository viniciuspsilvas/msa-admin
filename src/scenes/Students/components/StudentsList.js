import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Container, Row, Col, Input } from 'reactstrap';
import { Email, Visibility, ToggleOn, ToggleOff } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom'

import SearchBox from '../../../components/SearchBox'

import '../style.css';

const columns = (props) => [{
  dataField: 'fullname',
  text: 'Name',
  sort: true,
  align: 'left',
}, {
  dataField: 'email',
  text: 'Email',
  sort: true,
  align: 'left',
}, {
  dataField: 'phone',
  text: 'Phone',
  sort: true
}, {
  // Column 'Actions' - where the buttons are located.
  dataField: '',
  text: '',
  align: 'center',


  // Column 'Actions'
  formatter: (cellContent, row) => {
    return (
      <div>
        <span  >

          {row.device ? (
            <Tooltip title="Send notification">
              <Email style={{ cursor: 'pointer' }} onClick={() => props.openModalMessage(row)} />
            </Tooltip>
          ) : (
              <Email style={{ fillOpacity: "0.1" }} />
            )}
        </span>

        <span style={{ marginLeft: 5 }}>
          <Tooltip title="Details">
            <Link to={"/students/" + row._id} style={{ cursor: 'pointer' }}>
              <Visibility />
            </Link>
          </Tooltip>
        </span>

        <span style={{ marginLeft: 5 }}>
          <Tooltip title="Active">
            <Link to={"/students/" + row._id} style={{ cursor: 'pointer' }}>
              {row.isActive ? <ToggleOn /> : <ToggleOff />}
            </Link>
          </Tooltip>
        </span>

      </div>
    );
  }
},
];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const selectRow = props => ({
  mode: 'checkbox',
  clickToSelect: true,
  selected: props.listSelectedStudents,
  onSelect: props.handleOnSelect,
  onSelectAll: props.handleOnSelectAll
});

const actionsList = [];
actionsList.push(<option key="firstOpt" value=""> - Select Actions - </option>)
actionsList.push(<option key="MAKE_ENROLLMENT" value="MAKE_ENROLLMENT">Make Enrollment</option>)
actionsList.push(<option key="ACTIVE_STUDENTS" value="ACTIVE_STUDENTS">Active Students</option>)
actionsList.push(<option key="INACTIVE_STUDENTS" value="INACTIVE_STUDENTS">Inactive Students</option>)

const StudentList = props =>
  <Paper elevation={1} style={{ padding: 1 + 'em' }} >
    <ToolkitProvider
      keyField="_id"
      data={props.studentList}
      columns={columns(props)}
      search>
      {
        props2 => (
          <Container>
            <SearchBox {...props2.searchProps} placeholder="Search students" />

            <Row style={{ marginTop: 1 + 'em' }} >
              <Col>
                <BootstrapTable
                  {...props2.baseProps}
                  striped
                  hover
                  condensed
                  bootstrap4
                  selectRow={selectRow(props)}
                  noDataIndication="There is no student added."
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory()}
                  headerClasses="header-class"
                />
              </Col>
            </Row>

          </Container>
        )
      }
    </ToolkitProvider>

    <Row >
      <Col sm="3" className="float-right">
        <Input type="select" onChange={props.handleSelectActionChange} >
          {actionsList}
        </Input>
      </Col>
    </Row>
  </Paper>

export default StudentList;