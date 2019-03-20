import React from 'react';
import Moment from 'react-moment';

import BootstrapTable from 'react-bootstrap-table-next';
import { Container } from 'reactstrap';
import Drafts from '@material-ui/icons/Drafts';
import Mail from '@material-ui/icons/Mail';
import { Button } from 'reactstrap';
import Send from '@material-ui/icons/Send';
import Edit from '@material-ui/icons/Edit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddIcon from '@material-ui/icons/Add';

import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const columns = [{
  dataField: 'id',
  text: '',
  sort: true
}, {
  dataField: 'user',
  text: 'To',
  sort: true,
  formatter: toFormatter,
}, {
  dataField: 'body',
  text: 'Message',
  sort: true,
  formatter: bodyFormatter,
}, {
  dataField: 'sentAt',
  text: 'Sent at',
  sort: true,
  formatter: dataFormatter,
}, {
  dataField: 'isRead',
  text: 'Action',
  sort: true,
  formatter: readIconFormatter,
}];



function toFormatter(row) {
  return (
    <span>
      {row.fullname}
    </span>
  );
}


function bodyFormatter(cell, row) {
  return (
    <div>
      <span>
        {row.title}
      </span>
      {' - '}
      <span className='bodyTextTable'>
        {cell.substring(0, 60).concat("... ")}
        {row.isRead ? <Drafts titleAccess='Read' /> : <Mail titleAccess='Unread' />}
      </span>
    </div>
  );
}

function dataFormatter(cell) {
  return (
    <span>

      <Moment titleFormat="LLLL" withTitle format="DD/MM/YY">
        {cell}
      </Moment>

    </span>
  );
}

function readIconFormatter(cell, row) {
  //row.done
  return (
    <span>
      <Send titleAccess='Send again' style={{ cursor: 'pointer' }} />
      {' '}
      <Edit titleAccess='Edit' />
      {' '}
      <DeleteIcon fontSize="small" />
    </span>
  );
}


const defaultSorted = [{
  dataField: 'title',
  order: 'asc'
}];

const selectRow = {
  mode: 'checkbox',
};

const MessagesList = props => {
  const { list } = props;

  const indication = "Table is Empty";

  return (
    <Container>
      <Button color="primary" className="button">
        <AddIcon />
      </Button>
      <BootstrapTable keyField='id'
        classes='table table-sm'
        data={list}
        columns={columns}
        noDataIndication={indication}
        striped
        hover
        condensed
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
        selectRow={selectRow}
      />
    </Container>
  )
}

MessagesList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default MessagesList