import React, { Component } from 'react';
import logo from '../../images/Logo_vert.png';
import {  Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";

class HomeContainer extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <Container >
                <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block" />
                        <p className="lead blockquote text-center">Mindroom Student APP - Administration</p>
                        <hr className="my-2" />
                        <p className="blockquote text-center"> Here you can work on maintenance of students, class schedule, notifications and more.</p>

                </Paper>
            </Container>
        );
    }
}

//Redux configuration
function mapStateToProps(state) {
    return { studentList: state.studentReducer.studentList }
}

export default connect(mapStateToProps)(HomeContainer);