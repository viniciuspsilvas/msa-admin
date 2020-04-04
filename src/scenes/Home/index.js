import React from 'react';
import logo from '../../images/Logo_vert.png';
import {  Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import {version} from '../../../package.json';

export default function  HomeContainer() {
        return (
            <Container >
                <Paper elevation={1} style={{ padding: 1 + 'em' }} >
                <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block"  width='250' />
                <p className="lead blockquote text-center">Mindroom Student APP - Admin</p>
         
                </Paper>
            </Container>
        );
    }
