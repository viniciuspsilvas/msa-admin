import React, { Component } from 'react';

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
            <div className='tc'>
                Hello
                {console.log(this.props.studentList)}
            </div>
        );
    }
}

//Redux configuration
function mapStateToProps(state) {
    return { studentList: state.studentReducer.studentList }
}

export default connect(mapStateToProps)(HomeContainer);