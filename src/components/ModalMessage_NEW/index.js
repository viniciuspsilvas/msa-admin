import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';

import SpinnerModal from '../SpinnerModal';
import { showSuccess } from "../AlertApp/actions"

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import Flatpickr from 'react-flatpickr'
import moment from 'moment'

import { useDispatch, useSelector } from "react-redux";

import { fetchStudentGroupList } from "../../scenes/StudentGroups/actions";
import { fetchStudentList, sendNotification } from "../../scenes/Students/actions";

import './style.css';
import 'flatpickr/dist/themes/material_blue.css'

export default function ModalMessage({ isOpen, toggle }) {
    const { register, handleSubmit, errors, reset, control } = useForm();
    const dispatch = useDispatch();

    const [isToStudents, setIsToStudents] = useState(true)
    const [isSendNow, setIsSendNow] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [listReceivers, setListReceivers] = useState([])

    const [receiverType, setReceiverType] = useState('Students')

    const courseList = useSelector(state => state.studentGroupReducer.courseList);
    const studentList = useSelector(state => state.studentReducer.studentList);

    const onSubmit = (data) => {
        const { datetime, title, body } = data;

        var students = []
        if (isToStudents) {
            students = listReceivers
        } else {
            listReceivers.forEach(group => {
                const enrollmentsActive = group.enrollments.filter(enroll => enroll.student.isActive);
                if (enrollmentsActive.length > 0) {
                    students = students.concat(enrollmentsActive.map(enroll => enroll.student))
                }
            });
        }

        const scheduledFor = isSendNow ? null : new Date(datetime).toISOString()
        dispatch(sendNotification({ title, body, students, scheduledFor }));
        dispatch(showSuccess("Message successfully sent"));

        close();
    };

    const radioChangeHandler = (event) => {
        const { value } = event.target
        setIsToStudents(value === 'Students')
        setListReceivers([])

        if (value === 'Students') {
            dispatch(fetchStudentList())

        } else if (value === 'Courses') {
            dispatch(fetchStudentGroupList())

        } else {
            throw new Error(`Radio value ${value} invalid.`)
        }

    }

    const close = () => {
        reset();
        toggle();
    }

    const InvalidFeedback = ({ field }) => {
        if (errors[field]) {
            return <span className="error"> {errors[field].message}</span>
        } else {
            return <span />
        }
    }

    const ReceiversDropDown = () => {
        var optsReceivers = isToStudents ? { labelKey: "fullname", options: studentList } : { labelKey: "name", options: courseList };

        return <Controller
            as={<Typeahead id='receivers' />}
            control={control}
            name="receivers"
            rules={{ validate: value => (value && value.length > 0 || 'Field required.') }}
            multiple
            selected={listReceivers}
            defaultValues={[]}
            onChange={([selected]) => {
                setListReceivers(selected)
                return { value: selected };
            }}
            placeholder="Choose a receiver..."
            {...optsReceivers}
        >
        </Controller>
    }

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Quick Message</ModalHeader>
                    <ModalBody>
                        <Row >
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="datetime">When</Label>
                                    {isSendNow ? (
                                        <Input value={moment().format('DD/MM/YYYY')} disabled className='form-control' />
                                    ) : (
                                            <Controller
                                                as={<Flatpickr />}
                                                control={control}
                                                rules={{ required: 'Field required.' }}
                                                defaultValue={new Date()}
                                                data-enable-time
                                                name="datetime"
                                                className=' form-control-readonly'
                                                options={{
                                                    minuteIncrement: 1,
                                                    mode: 'single',
                                                    altInput: true,
                                                    dateFormat: 'F',
                                                    altFormat: 'd/m/Y H:i',
                                                    defaultDate: new Date(),
                                                    disable: [
                                                        function (date) {
                                                            var today = new Date();
                                                            today.setMinutes(today.getMinutes() - 3)
                                                            return (date < today);
                                                        }
                                                    ]
                                                }}
                                                onChange={([selectedDates]) => ({ value: selectedDates[0] })}
                                            />
                                        )}
                                </FormGroup>
                            </Col>
                            <Col md={6} style={{ paddingTop: '40px' }}>
                                <Input id="isSendNow"
                                    name="isSendNow"
                                    type="checkbox"
                                    aria-label="Now"
                                    onChange={() => setIsSendNow(!isSendNow)}
                                    checked={isSendNow} />
                                {' '}
                                <Label for="isSendNow">Now</Label>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: 15 }}>
                            <Col md={3}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="toRadio"
                                        id="studentRadio"
                                        checked={isToStudents}
                                        onChange={radioChangeHandler}
                                        value="Students"
                                    />

                                    <label className="form-check-label" htmlFor="studentRadio">
                                        Students
                                    </label>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="toRadio"
                                        id="courseRadio"
                                        checked={!isToStudents}
                                        onChange={radioChangeHandler}
                                        value="Courses"
                                    />
                                    <label className="form-check-label" htmlFor="courseRadio">
                                        Courses
                                    </label>
                                </div>
                            </Col>
                        </Row>

                        <Label for="toIpt">To <small>  {isToStudents ? '(Students)' : '(Courses)'} </small></Label>

                        <FormGroup>
                            <ReceiversDropDown />
                            <InvalidFeedback field='receivers' />
                        </FormGroup>

                        <FormGroup>
                            <Label for="titleIpt">Title*</Label>
                            <Input
                                name="title"
                                maxLength='50'
                                innerRef={register({ required: 'Field required.', max: 50, min: 5, maxLength: 50 })} /
                            >
                            <InvalidFeedback field='title' />
                        </FormGroup>

                        <FormGroup>
                            <Label for="textIpt">Body*</Label>
                            <Input type="textarea" name="body"
                                innerRef={register({ required: 'Field required.', max: 300, min: 5, maxLength: 300 })}
                                maxLength='300' />
                            <InvalidFeedback field='body' />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Send</Button>{' '}
                        <Button color="secondary" onClick={close}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </Container>
    );
}
