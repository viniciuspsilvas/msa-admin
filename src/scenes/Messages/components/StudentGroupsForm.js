import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Row, Col, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { inputLabeled } from "../../../components"
import { required, email } from "../../../util/validators"

const StudentGroupsForm = props => {
    const { handleSubmit, pristine, reset, submitting, onSubmit } = props

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>

            <Field
                name="name"
                label="Name"
                component={inputLabeled}
                placeholder="First name..."
                validate={[required]}
            />

            <Field
                name="description"
                label="Email"
                component={inputLabeled}
                placeholder="user@domain.com"
                validate={[required, email]}
            />

            <hr style={{ marginTop: 2 + 'em' }} />

            <Row>
                <Col> <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear</Button></Col>
                <Col> <Button color="primary" className="float-right" type="submit" disabled={pristine || submitting}>Submit</Button></Col>
            </Row>

        </Form>
    )
}

StudentGroupsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'simple',// a unique identifier for this form

})(StudentGroupsForm)