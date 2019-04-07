import React, { Component } from 'react';
import logo from '../../images/Logo_vert.png';
import { Jumbotron, Container } from 'reactstrap';

import { connect } from "react-redux";
//import { fetchStudentList } from "./actions";

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
        //this.props.actions.fetchStudentList();

        // this.props.dispatch(fetchStudentList());
    }

    render() {

        return (
            <div style={{margin: 50}}>
                <Jumbotron fluid>
                    <Container fluid>
                         <img src={logo} alt='Mindroom Student App'className="rounded mx-auto d-block" />
                        <p className="lead blockquote text-center">Mindroom Student APP - Administration</p>
                        <hr className="my-2" />
                        <p className="blockquote text-center"> Here you can work on maintenance of students, class schedule, notifications and more.</p>
               
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

//Redux configuration
function mapStateToProps(state) {
    return { studentList: state.studentReducer.studentList }
}

export default connect(mapStateToProps)(HomeContainer);