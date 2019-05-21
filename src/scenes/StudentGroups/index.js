import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStudentGroupList, createStudentGroup } from "./actions";
import { Container } from 'reactstrap';
import StudentGroupsList from './components/StudentGroupsList'
import { SubmissionError } from 'redux-form'
import Paper from '@material-ui/core/Paper';

import { createLoadingSelector } from '../../redux/selectors';
import SpinnerModal from '../../components/SpinnerModal';

import './style.css';
import { Button } from 'reactstrap';

class StudentGroups extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchStudentGroupList();
    }

    handleFormSubmit = (values) => {
        return new Promise((resolve, reject) => {
            this.props.createStudentGroup(values)
        }).catch((error) => {
            throw new SubmissionError(error);
        });
    }

    render() {
        const { error, loading, studentGroupList } = this.props;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Group Students</h1>

                {/* <StudentGroupsForm onSubmit={values => this.handleFormSubmit(values)} /> */}

                <Paper elevation={1} style={{ padding: 1 + 'em' }} >

                    <StudentGroupsList list={studentGroupList} >
                        <Button color="primary">New</Button>
                    </StudentGroupsList>
                </Paper>

            </Container>
        );
    }
}

const loadingSelector = createLoadingSelector(['GET_TODOS']);

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.studentGroupReducer,
        isFetching: loadingSelector(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudentGroupList: () => dispatch(fetchStudentGroupList()),
        createStudentGroup: (studentGroup) => dispatch(createStudentGroup(studentGroup)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentGroups);