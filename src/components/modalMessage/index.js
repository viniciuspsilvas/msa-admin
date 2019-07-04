import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';
import moment from 'moment'

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import Flatpickr from 'react-flatpickr'

import './style.css';
import 'flatpickr/dist/themes/material_blue.css'

const ModalMessage = props => {
    const {
        isOpen = false,
        studentList = [],
        groupList = [],
        receivers = [],
        severity,
        datetime,
        isSendNow,
        title,
        body,
        handleInputChange,
        handleSubmit,
        handleCancel,
        handleChangeDate
    } = props;

    var dateNow = new Date();
    dateNow.setMinutes(dateNow.getMinutes() - 1);

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' >
                <ModalHeader>Quick Message</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="toIpt">To</Label>

                            {studentList.length > 0 &&
                                <Typeahead id='TpheadStudents'
                                    labelKey="fullname"
                                    options={studentList}
                                    selected={receivers}
                                    multiple
                                    onChange={(selected) => receivers.push(selected)}
                                    placeholder="Choose a receiver..." />
                            }

                            {groupList.length > 0 &&
                                <Typeahead id='TpheadGroups'
                                    labelKey="name"
                                    options={groupList}
                                    selected={receivers}
                                    multiple
                                    onChange={(selected) => receivers.push(selected)}
                                    placeholder="Choose a receiver..." />
                            }

                        </FormGroup>

                        <Row >
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="datetime">When</Label>

                                    {isSendNow ? (
                                        <Input value={moment().format('DD/MM/YYYY')} disabled />
                                    ) : (
                                            <Flatpickr data-enable-time
                                                name="datetime"
                                                className='form-control-readonly form-control'
                                                value={datetime}
                                                onChange={handleChangeDate}
                                                options={{
                                                    dateFormat: 'd/m/Y H:i',
                                                    minDate: dateNow
                                                }}
                                            />
                                        )}

                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <div style={{ marginTop: '35px' }}>
                                    <Input  
                                        name="isSendNow"
                                        onChange={handleInputChange}
                                        type="checkbox"
                                        aria-label="Now"
                                        checked={isSendNow}
                                        style={{ marginLeft: '-20px' }} />
                                    {'    '}
                                    <Label for="isSendNow" style={{ marginTop: '10px' }} >Now</Label>
                                </div>
                            </Col>

                            <Col md={5}>
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
    studentList: PropTypes.array.isRequired
};

export default ModalMessage;

