import React from 'react';
import Moment from 'react-moment';

import BootstrapTable from 'react-bootstrap-table-next';
import Paper from '@material-ui/core/Paper';
import Drafts from '@material-ui/icons/Drafts';
import Mail from '@material-ui/icons/Mail';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { Delete } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { UncontrolledCollapse, Button } from 'reactstrap';

import './style.css'

const columns = (openConfirmDeleteModal) => [{
  dataField: 'student',
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
  dataField: 'student.email',
  text: 'Email',
  sort: true,
  headerAlign: 'center',
  align: 'center'
}
  , {
  dataField: 'createdAt',
  text: 'Created',
  sort: true,
  formatter: dataFormatter,
  classes: 'dateColumn',
  headerAlign: 'center',
  align: 'center'
}
  , {
  dataField: 'sentAt',
  text: 'Sent',
  sort: true,
  formatter: dataFormatter,
  classes: 'dateColumn',
  headerAlign: 'center',
  align: 'center'
}
  , {
  dataField: 'scheduledFor',
  text: 'Scheduled',
  sort: true,
  formatter: dataFormatter,
  classes: 'dateColumn',
  headerAlign: 'center',
  align: 'center'
}, {
  dataField: '',
  text: '',
  align: 'center',

  formatter: (cellContent, row) => {

    return (
      <div className="col-1">
        <Tooltip title="Delete">
          <Delete style={{ cursor: 'pointer' }} onClick={() => openConfirmDeleteModal(row)} />
        </Tooltip>
      </div>
    );
  }
}
];

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
      <Button outline color="link" size="sm" id={`toggler_${row._id}`}>+</Button>
      <span>
        {row.isRead ? <Drafts className='bodyTextTable' titleAccess='Read' /> : <Mail titleAccess='Unread' />}
        {'  '}
        {row.title}
      </span>

      <UncontrolledCollapse toggler={`#toggler_${row._id}`}>
        <span className='bodyTextTable'>
          {cell}
        </span>
      </UncontrolledCollapse>
    </div>
  );
}

function dataFormatter(cell) {
  return (
    <div className='col-2'>
      {cell &&
        <Moment titleFormat="LLLL" withTitle format="DD/MM/YY HH:mm">
          {cell}
        </Moment>
      }
    </div>
  );
}

const defaultSorted = [{
  dataField: 'title',
  order: 'asc'
}];

const MessagesList = props => {
  const { list, openConfirmDeleteModal } = props;
  const indication = "There is no message created.";

  return (
    <Paper elevation={1} style={{ padding: 1 + 'em' }} >
      <BootstrapTable keyField='_id'
        classes='table-sm table-responsive-lg'
        data={list}
        columns={columns(openConfirmDeleteModal)}

        noDataIndication={indication}
        striped
        hover
        condensed
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
      />
    </Paper>
  )
}


export default MessagesList