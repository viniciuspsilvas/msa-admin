import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Container, Row, Col } from 'reactstrap';
import { Email } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import SearchBox from '../../../components/SearchBox'

import '../style.css';

const columns = (props) => [{
  dataField: 'id',
  text: 'ID',
  sort: true
}, {
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

  // Apply event to the column
  events: {
    onClick: (e, column, columnIndex, row, rowIndex) => {
      if (row.advices.length > 0) props.openModalMessage(row);
    },
  },

  // Column 'Actions'
  formatter: (cellContent, row) => {
    return (
      <div>
        {
          row.advices.length > 0 &&
          <Tooltip title="Send notification">
            <div>
              <Email style={{ cursor: 'pointer' }} />
              
            </div>
          </Tooltip>
        }
      </div>
    );
  }
},
];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

export default props =>
  <Paper elevation={1} style={{ padding: 1 + 'em' }} >
    <ToolkitProvider
      keyField="id"
      data={props.studentList}
      columns={columns(props)}
      search>
      {
        props => (
          <Container>
            <SearchBox {...props.searchProps} placeholder="Search students" />
          
            <Row style={{ marginTop: 1 + 'em' }} >
              <Col>
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  hover
                  condensed
                  bootstrap4
                  noDataIndication="Table is Empty"
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
  </Paper>