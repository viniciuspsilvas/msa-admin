import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Container, Row, Col } from 'reactstrap';
import { Email } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

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
            <Email style={{ cursor: 'pointer' }} />
          </Tooltip>
        }
      </div>
    );
  }
},
];

// Search field localized on top
const MySearch = (props) => {
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
  };
  return (
    <Row>
      <Col>
        <input
          className="form-control"
          ref={n => input = n}
          type="text"
        />
      </Col>
      <Col>
        <button className="btn btn-info" onClick={handleClick}>Search</button>
      </Col>
    </Row>
  );
};

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

export default props =>
    <ToolkitProvider
      keyField="id"
      data={props.studentList}
      columns={columns(props)}
      search>
      {
        props => (
          <Container>
            <MySearch {...props.searchProps} placeholder="Search students" />
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
                />
              </Col>
            </Row>
          </Container>
        )
      }
    </ToolkitProvider>