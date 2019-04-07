import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form'

import { Paper } from '@material-ui/core';
import { Button } from 'react-bootstrap';

import InputLabeled from '../../../../components/InputLabeled'
import { required, email } from "../../../../util/validators"
import logo from '../../../../images/Logo_vert.png';

import './style.css';

const LoginForm = ({ handleSubmit, handleChange, value, /* pristine, reset, */ submitting }) => {

    return (
        <Paper className='container' elevation={1} >

            <img src={logo} alt='Mindroom Student App' className="rounded mx-auto d-block" width='200' />
            <Form style={{ margin: 20 }} onSubmit={handleSubmit} >
                <Field
                    required
                    name="email"
                    label="Email"
                    component={InputLabeled}
                    validate={[required, email]}
                    onChange={handleChange}
                    value={value}
                />

                <Field
                    required
                    name="password"
                    label="Password"
                    component={InputLabeled}
                    validate={[required]}
                    onChange={handleChange}
                    value={value}
                />

                <Button variant="primary"
                    disabled={submitting}
                    type="submit" >
                    Login
                </Button>
            </Form>

        </Paper>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'loginForm',// a unique identifier for this form

})(LoginForm)