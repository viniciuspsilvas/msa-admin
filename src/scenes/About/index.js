import React, { Component } from 'react';
import logo from '../../images/background.png';
import { Jumbotron, Container } from 'reactstrap';

import { connect } from "react-redux";

class AboutContainer extends Component {

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
            <div style={{ margin: 50 }}>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="text-center">About US</h1>
                        <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block" height="200" />
                        <hr className="my-2" />
                        <p className="lead blockquote text-center">
                            Our team of current industry experts is bringing new ideas, innovations and people together through education. We are here to provide you with the essential IT skill set you need to take your place in today’s fastest growing industry. Embark with us on a journey of innovation, creativity and collaboration.
                        </p>

                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

//Redux configuration
function mapStateToProps(state) {
    return {
        //    studentList: state.studentReducer.studentList 
    }
}

export default connect(mapStateToProps)(AboutContainer);