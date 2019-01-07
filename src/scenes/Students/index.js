import React, { Component } from 'react';
import { fetchStudentList } from "./actions";
import { connect } from "react-redux";

import StudentList from './components/StudentsList'
import ModalMessage from '../../components/modalMessage'
import { togleModalMessage } from "../../components/modalMessage/actions";

import { Container } from 'reactstrap';

class Students extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentsSelected: [],
            title: '',
            body: '',
            severity: '',
        };
    }

    // Open Modal Message
    openModalMessage = (studentSelected) => {

        this.setState({
            studentSelected: studentSelected
        });

        this.props.togleModalMessage();
    }

    componentDidMount() {
        this.props.fetchStudentList();
    }

    render() {
        const { error, loading, studentList } = this.props;
        const { modalOpen } = this.props;

        const { studentSelected } = this.state;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <div>Loading...</div> }

        return (
            <Container >
                <ModalMessage isOpen={modalOpen}
                    to={studentSelected}
                />

                <StudentList studentList={studentList} openModalMessage={this.openModalMessage} />;
        </Container>
        )
    }
}

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.studentReducer,

    };
};


// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudentList: () => dispatch(fetchStudentList()),
        togleModalMessage: () => dispatch(togleModalMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);