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
        course,
        isEditing = false
    } = props;


    const { name, description, active } = course

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' toggle={handleToggleModal} >
                <ModalHeader>{isEditing ? "Edit" : "Add"} Course</ModalHeader>
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

                        <FormGroup >
                            <input name="active" id="active"
                                onChange={handleChange}
                                type="checkbox"
                                checked={active} />
                                {"  "}
                            <Label>Active</Label>
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