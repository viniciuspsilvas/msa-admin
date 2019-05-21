import React, { Component } from 'react';
import logo from '../../images/background.png';
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';

class AboutContainer extends Component {

    render() {
        return (
            <Container >
                <h1>About</h1>

                {/* <StudentGroupsForm onSubmit={values => this.handleFormSubmit(values)} /> */}

                <Paper elevation={1} style={{ padding: 1 + 'em' }} >

                    <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block" height="200" />
                    <hr className="my-2" />
                    <p className="lead blockquote text-center">
                        Our team of current industry experts is bringing new ideas, innovations and people together through education. We are here to provide you with the essential IT skill set you need to take your place in today’s fastest growing industry. Embark with us on a journey of innovation, creativity and collaboration.
                        </p>
                </Paper>

            </Container>
        );
    }
}

export default AboutContainer;