import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Row, Col } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';

import { Edit, Delete, Email, SupervisorAccount } from '@material-ui/icons';

import NotInterestedIcon from '@material-ui/icons/NotInterested';

import SearchBox from '../../../components/SearchBox'

import '../style.css';

const columns = (props) => [{
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
      <div className="iconColumn">
        {
          !row.active &&
          <span >
            <Tooltip title="Activated">
              <NotInterestedIcon style={{ cursor: 'pointer' }} />
            </Tooltip>
          </span>
        }
        {row.active &&
          <>
            <span >
              <Tooltip title="List students">
                <SupervisorAccount style={{ cursor: 'pointer' }} onClick={() => props.openListStudentsModal(row)} />
              </Tooltip>
            </span>
            <span >
              <Tooltip title="Send notification">
                <Email style={{ cursor: 'pointer' }} onClick={() => props.openModalMessage(row)} />
              </Tooltip>
            </span>

          </>
        }
        <span >
          <Tooltip title="Edit">
            <Edit style={{ cursor: 'pointer' }} onClick={() => props.openEditModal(row)} />
          </Tooltip>
        </span>

        {row.enrollments.length === 0 &&
          <span >
            <Tooltip title="Delete">
              <Delete style={{ cursor: 'pointer' }} onClick={() => props.openConfirmModal(row)} />
            </Tooltip>
          </span>
        }

      </div>
    );
  }
},
];

const defaultSorted = [{
  dataField: '_id',
  order: 'asc'
}];

export default props =>
  (
    <ToolkitProvider
      keyField="_id"
      data={props.list}
      columns={columns(props)}
      search>

      {
        props => (
          <>
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
          </>
        )
      }
    </ToolkitProvider>)