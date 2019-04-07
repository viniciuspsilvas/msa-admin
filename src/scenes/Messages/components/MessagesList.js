import React from 'react';
import Moment from 'react-moment';

import BootstrapTable from 'react-bootstrap-table-next';
import { Container } from 'reactstrap';
import Drafts from '@material-ui/icons/Drafts';
import Mail from '@material-ui/icons/Mail';
import Send from '@material-ui/icons/Send';
import paginationFactory from 'react-bootstrap-table2-paginator';

import PropTypes from 'prop-types';

import './style.css'

const columns = (handleSendNotif) => [{
  dataField: 'id',
  text: '',
  sort: true,
  classes: 'idColumn'
}, {
  dataField: 'user',
  text: 'To',
  sort: true,
  formatter: toFormatter,
  classes: 'toColumn'
}, {
  dataField: 'body',
  text: 'Message',
  sort: true,
  formatter: bodyFormatter,
  classes: 'bodyColumn'
}, {
  dataField: 'sentAt',
  text: 'Sent at',
  sort: true,
  formatter: dataFormatter,
  classes: 'dateColumn',
  headerAlign: 'center',
  align: 'center'
}, {
  dataField: 'isRead',
  text: 'Action',
  sort: true,
  formatter: readIconFormatter,
  classes: 'actionsColumn',
  headerAlign: 'center',
  align: 'center',
  events: {
    onClick: (e, column, columnIndex, row, rowIndex) => { handleSendNotif(row)},
  }
}];



function toFormatter(row) {
  return (
    <span className='toColumn'>
      {row.fullname}
    </span>
  );
}


function bodyFormatter(cell, row) {
  return (
    <div>
      <span>
        {row.isRead ? <Drafts className='bodyTextTable' titleAccess='Read' /> : <Mail titleAccess='Unread' />}
        {'  '}
        {row.title}
      </span>
      {' - '}
      <span className='bodyTextTable'>
        {cell.substring(0, 45).concat("... ")}
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
    </span>
  );
}


const defaultSorted = [{
  dataField: 'title',
  order: 'asc'
}];

const selectRow = {
  mode: 'checkbox',
  classes: 'selectColumn'
};

const MessagesList = props => {
  const { list, handleSendNotif } = props;

  const indication = "Table is Empty";

  return (
    <Container>
      <BootstrapTable keyField='id'
        classes='table-sm table-responsive-lg'
        data={list}
        columns={columns(handleSendNotif)}

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
  handleSendNotif: PropTypes.func,
};

export default MessagesList