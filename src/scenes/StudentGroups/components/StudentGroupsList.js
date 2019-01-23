import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Container, Row, Col } from 'reactstrap';

import SearchBox from '../../../components/SearchBox'

import '../style.css';

const columns = () => [{
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
},
];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
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
  </ToolkitProvider>)