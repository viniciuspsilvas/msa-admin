import React, { useState, useEffect } from 'react';

import ListUsers from "./components/ListUsers/"
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import { Button } from 'reactstrap';

import SpinnerModal from '../../components/SpinnerModal';
import AlertBox from '../../components/AlertBox'

import { fetchUserList } from "./actions";
import { useDispatch, useSelector } from 'react-redux'

export default function Users() {
    const dispatch = useDispatch();

    const [userList, setUserList] = useState([{}]);

    const { loading, error } = useSelector(state => state.userReducer);

    useEffect(() => {

        dispatch(fetchUserList())
            .then(result => {
                setUserList(result);
            })
           // .catch(error => Alert.alert(error.message))

    }, []);

    if (loading) { return <SpinnerModal /> }
    if (error) { return <AlertBox error={error} /> }

    return (
        <Paper elevation={1} style={{ padding: 1 + 'em' }} >
            <Container>

                <ListUsers list={userList} />
                <div style={{ textAlign: 'right' }} >
                    <Button color="primary" >New</Button>
                </div>
            </Container>
        </Paper>
    );
}