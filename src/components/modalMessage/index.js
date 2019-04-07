import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

import './style.css';

const ModalMessage = props => {
    const { 
        studentList = [], 
        isOpen = false, 
        studentsSelected = [], 
        severity, 
        title, 
        body, 
        handleInputChange, 
        handleSubmit, 
        handleCancel 
    } = props;

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' >
                <ModalHeader>Quick Message</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="toIpt">To</Label>

                            <Typeahead id='TpheadStudents'
                                labelKey="fullname"
                                options={studentList}
                                selected={studentsSelected}
                                multiple
                                onChange={(selected) => studentsSelected.push(selected)}
                                placeholder="Choose a receiver..." />
                        </FormGroup>

                        <Row >
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="whenDt">When</Label>

                                    <Input id="whenDt" name="whenDt" value="Now" disabled />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="severitySelect">Severity</Label>
                                    <Input type="select" name="severity"
                                        id="severitySelect"
                                        onChange={handleInputChange}
                                        value={severity}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="titleIpt">Title</Label>
                            <Input name="title" id="titleIpt"
                                onChange={handleInputChange}
                                value={title} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="textIpt">Body</Label>
                            <Input type="textarea" name="body" id="textIpt"
                                onChange={handleInputChange}
                                value={body} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        onClick={handleSubmit}
                        type="submit">Send</Button>{' '}
                    <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}




ModalMessage.propTypes = {
    studentList : PropTypes.array.isRequired
};

export default ModalMessage;

