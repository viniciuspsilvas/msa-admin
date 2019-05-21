import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { required, email } from "../../../../util/validators"

import { inputLabeled } from "../../../../components/InputLabeled"

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

import './style.css';

const GroupFormModal = props => {
    const {
        isOpen = true,
        handleSubmit, pristine, reset, submitting, onSubmit
    } = props;

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' >
                <ModalHeader>Group</ModalHeader>
                <ModalBody>
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
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear</Button>{' '}
                    <Button color="primary" className="float-right" type="submit" disabled={pristine || submitting}>Submit</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}




GroupFormModal.propTypes = {
    studentList: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'GroupFormModal',// a unique identifier for this form
})(GroupFormModal)