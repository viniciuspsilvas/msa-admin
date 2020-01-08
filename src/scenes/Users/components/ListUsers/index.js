import React, { useState, useEffect } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Tooltip from '@material-ui/core/Tooltip';

import SpinnerModal from '../../../../components/SpinnerModal';
import AlertBox from '../../../../components/AlertBox'

import { Button } from 'reactstrap';

import { fetchUserList } from "../../actions";
import { useDispatch, useSelector } from 'react-redux'

import { Edit } from '@material-ui/icons';

import { Link, useRouteMatch } from "react-router-dom";

import './style.css';

const columns = (props) => [{
    dataField: 'firstname',
    text: 'First name',
}, {
    dataField: 'lastname',
    text: 'Last name',
}, {
    dataField: 'email',
    text: 'Email',
}, {
    dataField: '',
    text: '',
    align: 'center',
    style: { width: '1%' },

    formatter: (cellContent, row) => (
        <div >
            <span >
                <Tooltip title="Edit">
                    <Link to={`/settings/users/newUser/${row._id}`}>
                        <Edit style={{ cursor: 'pointer' }} color="action" />
                    </Link>
                </Tooltip>
            </span>
        </div>
    )
},
];

const defaultSorted = [{
    dataField: 'firstname',
    order: 'asc'
}];


export default function ListUsers(props) {

    const dispatch = useDispatch();
    const [list, setList] = useState([{}]);

    let { url } = useRouteMatch();

    const { loading, error } = useSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(fetchUserList())
            .then(result => {
                setList(result);
            })
    }, []);

    if (loading) { return <SpinnerModal /> }
    if (error) { return <AlertBox error={error} /> }

    if (!list || list.length === 0) { return <span >There is no users created.</span> }

    return (
        <>
            <BootstrapTable
                keyField='_id'
                data={list}
                columns={columns(props)}
                striped
                hover
                condensed
                bootstrap4
                noDataIndication="There is no users created."
                defaultSorted={defaultSorted}
                pagination={paginationFactory()}
            />

            <div style={{ textAlign: 'right' }} >
                <Link to={`${url}/newUser`}>
                    <Button color="primary"  >New</Button>
                </Link>
            </div>
        </>)

}