import React from 'react';
import logo from '../../images/Logo_vert.png';
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';

export default function HomeContainer() {
    return (
        <Container >
            <Paper elevation={1} style={{ padding: 1 + 'em' }} style={{ height: '500px', padding:'100px' }}  >
                <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block" width='250' />
                <p className="text-muted text-center">Administration</p>
            </Paper>
        </Container>
    );
}
