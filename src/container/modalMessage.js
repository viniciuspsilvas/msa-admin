import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';
import axios from 'axios';

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import SpinnerModal from '../components/SpinnerModal';

var config = require('../config/config');

class ModalMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            error: null,
            students: [],
            studentsSelected: [],
            title: '',
            body: '',
            severity: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //Load students from backend
        axios.get(config.backend.students)
            .then(result => this.setState({
                students: result.data,
                isLoading: false,

            }))
            .catch(error => this.setState({
                error,
            }));
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // Case a student is selected on the parent
        if (this.props.to !== prevProps.to) {
            this.setState({ studentsSelected: [this.props.to] })
        }
    }

    resetForm = () => {
        this.setState({
            studentsSelected: [],
            title: '',
            body: '',
            severity: '',
        });
      }

    // Called always when a input is changed
    handleInputChange = (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // Handle of Send button
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });

        // Prepare data to be sent to backend
        let data = {
            "title": this.state.title,
            "body": this.state.body,
            "severity": this.state.severity,
            "receivers": this.state.studentsSelected
        }

        // Request to backend 
        axios.post(config.backend.sendMessageBatch, { "data": data })
            .then(result => this.setState({
                isLoading: false,
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));

        this.props.toggle();
        this.resetForm();
    }

    // RENDER
    render() {
        const { error, isLoading, students, studentsSelected } = this.state;

        if (error) { return <p>{error.message}</p> }

        if (isLoading) { return <SpinnerModal loading={isLoading} /> }

        const cancelButton = () => {
            this.props.toggle();
            this.resetForm();
        }

        return (

            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>Quick Message</ModalHeader>
                    <ModalBody>
                        <Form>

                            <FormGroup>
                                <Label for="toIpt">To</Label>

                                <Typeahead
                                    labelKey="fullname"
                                    options={students}
                                    selected={studentsSelected}
                                    multiple
                                    onChange={(selected) => this.setState({ studentsSelected: selected })}
                                    placeholder="Choose a receiver..." />
                            </FormGroup>

                            <Row >
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="whenDt">When</Label>
                                        {/* <DateAndTimePickers id="whenDt" name="whenDt"
                                            onChange={this.handleInputChange}
                                            value={this.state.when} /> */}
                                        <Input id="whenDt" name="whenDt" value="Now" disabled />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="severitySelect">Severity</Label>
                                        <Input type="select" name="severity"
                                            id="severitySelect"
                                            onChange={this.handleInputChange}
                                            value={this.state.severity}>
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
                                    onChange={this.handleInputChange}
                                    value={this.state.title} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="textIpt">Body</Label>
                                <Input type="textarea" name="body" id="textIpt"
                                    onChange={this.handleInputChange}
                                    value={this.state.body} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                            onClick={this.handleSubmit}
                            type="submit">Send</Button>{' '}
                        <Button color="secondary" onClick={cancelButton}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default ModalMessage;