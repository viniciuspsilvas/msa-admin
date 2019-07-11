import React from 'react';
//import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Container, Button } from 'reactstrap';

// Import as a module in your JS

import './style.css';

const GroupFormModal = props => {
    const {
        isOpen = true,
        handleSubmit, pristine, submitting,
        handleChange, handleToggleModal,
        name,
        description,
        isEditing = false
    } = props;

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' toggle={handleToggleModal} >
                <ModalHeader>{isEditing ? "Edit" : "Add"} Group</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormGroup >
                            <Label>Name*</Label>
                            <Input name="name" id="name"
                                onChange={handleChange}
                                value={name} />
                        </FormGroup>

                        <FormGroup >
                            <Label>Description*</Label>
                            <Input name="description" id="description"
                                onChange={handleChange}
                                type="textarea"
                                value={description} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" onClick={handleToggleModal}>Clear</Button>{' '}
                        <Button color="primary" className="float-right" type="submit" disabled={pristine || submitting}>Submit</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </Container>
    );
}

export default GroupFormModal;
/*

GroupFormModal.propTypes = {
    studentList: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'GroupFormModal',// a unique identifier for this form
})(GroupFormModal) */