import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Container, Row, Col } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';

import { Edit, Delete, Email, SupervisorAccount } from '@material-ui/icons';

import SearchBox from '../../../components/SearchBox'

import '../style.css';

const columns = (props) => [{
  dataField: 'id',
  text: 'ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Name',
  sort: true,
  align: 'left',
}, {
  dataField: 'description',
  text: 'Description',
  sort: true,
  align: 'left',
}, {
  dataField: '',
  text: '',
  align: 'center',

  formatter: (cellContent, row) => {
    return (
      <div>
        <span className="iconColumn">
          <Tooltip title="List students">
            <SupervisorAccount style={{ cursor: 'pointer' }} onClick={() => props.openListStudentsModal(row)} />
          </Tooltip>
        </span>
        <span className="iconColumn">
          <Tooltip title="Send notification">
            <Email style={{ cursor: 'pointer' }} onClick={() => props.openModalMessage(row)} />
          </Tooltip>
        </span>
        <span className="iconColumn">
          <Tooltip title="Edit">
            <Edit style={{ cursor: 'pointer' }} onClick={() => props.openEditModal(row)} />
          </Tooltip>
        </span>
        <span className="iconColumn">
          <Tooltip title="Delete">
            <Delete style={{ cursor: 'pointer' }} onClick={() => props.openConfirmModal(row)} />
          </Tooltip>
        </span>

      </div>
    );
  }
},
];

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}];

export default props =>
  (
    <ToolkitProvider
      keyField="id"
      data={props.list}
      columns={columns(props)}
      search>

      {
        props => (
          <Container>
            <SearchBox {...props.searchProps} placeholder="Search student groups" />
            <Row style={{ marginTop: 1 + 'em' }} >
              <Col>
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  hover
                  condensed
                  bootstrap4
                  noDataIndication="There is no course created."
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory()}
                  headerClasses="header-class"
                />
              </Col>
            </Row>
          </Container>
        )
      }
    </ToolkitProvider>)