import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'

import { Edit } from '@material-ui/icons';

import './style.css';

const columns = (props) => [{
    dataField: 'firstname',
    text: 'First name',
    sort: true,
    align: 'left',
    class: 'col-4'
}, {
    dataField: 'lastname',
    text: 'Last name',
    sort: true,
    align: 'left',
    class: 'col-4',
}, {
    dataField: 'username',
    text: 'Username',
    sort: true,
    align: 'left',
    class: 'col-3',
}, {
    dataField: '',
    text: '',
    align: 'center',
    class: 'col-1',

    formatter: (cellContent, row) => (
        <div className="iconColumn">
            <span >
                <Tooltip title="Edit">
                    <Link to={"/users/" + row._id} style={{ cursor: 'pointer' }}>
                        <Edit />
                    </Link>
                </Tooltip>
            </span>
        </div>
    )
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
        >
            {
                props => (
                    <BootstrapTable
                        {...props.baseProps}
                        striped
                        hover
                        condensed
                        bootstrap4
                        noDataIndication="There is no users created."
                        defaultSorted={defaultSorted}
                        pagination={paginationFactory()}
                        headerClasses="header-class"
                    />
                )
            }
        </ToolkitProvider>
    )