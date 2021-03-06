import React from 'react';
import logo from '../../images/Logo_vert.png';
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';

export default function HomeContainer() {
    return (
        <Container >
            <Paper elevation={1} style={{ padding: 5 + 'em', height: '500px' }}  >
                <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block" width='250' />
                <p className="text-muted text-center">Administration</p>
            </Paper>
        </Container>
    );
}
