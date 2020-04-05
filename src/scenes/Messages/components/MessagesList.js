import React, { useState } from 'react';
import Moment from 'react-moment';

import { useDispatch } from "react-redux";

import { showSuccess, showInfo} from "../../../components/AlertApp/actions"
import { fetchMessageList, deleteMessages } from "../actions";

import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

import Drafts from '@material-ui/icons/Drafts';
import Mail from '@material-ui/icons/Mail';

import { Delete } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { UncontrolledCollapse, Button, Container, Row, Col, Input } from 'reactstrap';

import ConfirmModal from '../../../components/ConfirmModal'
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
  const [listSelected, setListSelected] = useState([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const dispatch = useDispatch();

  const { list, openConfirmDeleteModal } = props;
  const indication = "No messages to show.";

  const actionsList = [];
  actionsList.push(<option key="firstOpt" value=""> - Select Actions - </option>)
  actionsList.push(<option key="DELETE_MESSAGES" value="DELETE_MESSAGES">Delete Messages</option>)

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {

      listSelected.push(row)
      setListSelected(listSelected);
    } else {
      setListSelected(listSelected.filter(x => x !== row._id));
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const list = rows.map(r => r._id);
    if (isSelect) {
      setListSelected(list);
    } else {
      setListSelected([]);
    }
  }

  const selectRow = () => ({
    mode: 'checkbox',
    clickToSelect: true,
    selected: listSelected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  });

  const paginationOption = {
    custom: true,
    totalSize: props.list.length
  };

  const handleSelectActionChange = (event) => {
    switch (event.target.value) {
      case "DELETE_MESSAGES":
        setShowDeleteConfirmModal(true);
        event.target.selectedIndex = 0
        break;
      default:
        return;
    }
  }

  const confirmDeleteSelected = async () => {
    const _ids = listSelected.map(msg => msg._id)

    if (_ids.length > 0){
      await dispatch(deleteMessages(_ids));
      await dispatch(fetchMessageList());
      await dispatch(showSuccess("Messages successfully deleted."));
    } else{
      await dispatch(showInfo("Select at least one item."));
    }
    
    
    setShowDeleteConfirmModal(false);
  }

  return (
    <>
      <ConfirmModal
        isOpen={showDeleteConfirmModal}
        title="Confirm"
        text="Confirm this operation?"
        handleToggleModal={() => setShowDeleteConfirmModal(!showDeleteConfirmModal)}
        handleConfirm={confirmDeleteSelected}
      />

      <ToolkitProvider
        keyField="_id"
        data={list}
        columns={columns(openConfirmDeleteModal)}
        search>
        {
          props2 => (
            <Container>
              <PaginationProvider pagination={paginationFactory(paginationOption)}  >
                {
                  ({
                    paginationProps,
                    paginationTableProps
                  }) => (
                      <>
                        <Row style={{ marginTop: 1 + 'em' }} >
                          <Col>
                            <BootstrapTable
                              {...props2.baseProps}
                              striped
                              hover
                              condensed
                              bootstrap4
                              selectRow={selectRow(props)}
                              noDataIndication={indication}
                              defaultSorted={defaultSorted}
                              headerClasses="header-class"
                              {...paginationTableProps}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col sm="3">
                            <Input type="select" onChange={handleSelectActionChange} >
                              {actionsList}
                            </Input>
                          </Col>
                          <Col className="d-flex flex-row-reverse">
                            <PaginationListStandalone  {...paginationProps} />
                          </Col>
                          <Col sm="1" className="d-flex flex-row-reverse">
                            <SizePerPageDropdownStandalone  {...paginationProps} />
                          </Col>
                        </Row>
                      </>
                    )
                }
              </PaginationProvider>
            </Container>
          )
        }
      </ToolkitProvider>
    </>
  )

}


export default MessagesList