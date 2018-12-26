import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DateAndTimePickers from '../components/DateAndTimePickers'
import axios from 'axios';

import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';

var config = require('../config/config');

class ModalMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: null,

            modal: this.props.isOpen,
            students: [],
            studentsSelected: []
        };

        this.toggle = this.toggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.resetModal();
        this.setState({ studentsSelected: [] });

        //Load students from backend
        axios.get(config.backend.students)
            .then(result => this.setState({
                students: result.data,
            }))
            .catch(error => this.setState({
                error,
            }));
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
        this.setState({ isLoading: true });

        // Prepare data to be sent to backend
        let data = {
            "title": "this.state.title",
            "body": "this.state.body",
            "severity": "this.state.severity",
            "receivers": this.state.studentsSelected
        }

        // Request to backend 
        axios.post(config.backend.messages + "/sendMessageBatch", { "data": data })
            .then(result => this.setState({
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    // Clear all modal fields
    resetModal = () => {
        this.setState({
            when: "",
            severity: "",
            title: "",
            body: "",
        });
    }

    //Toggle Modal Message
    toggle = () =>{

        this.props.isOpen = !this.props.isOpen
        this.resetModal();
    }

    // RENDER
    render() {
        const { isLoading, error } = this.state;

        if (error) {return <p>{error.message}</p>}
        if (isLoading) {return <p>Loading ...</p>}

        var students = this.props.to ? [this.props.to] : [];

        return (

            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Quick Message</ModalHeader>
                    <ModalBody>
                        <Form>

                            <FormGroup>
                                <Label for="toIpt">To</Label>
                                <Typeahead
                                    labelKey="fullname"
                                    options={this.state.students}
                                    selected={students}
                                    multiple
                                    onChange={(selected) => this.setState({ studentsSelected: selected })}
                                    placeholder="Choose a receiver..." />
                            </FormGroup>

                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="whenDt">When</Label>
                                        <DateAndTimePickers id="whenDt" name="when"
                                            onChange={this.handleInputChange}
                                            value={this.state.when} />
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
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalMessage;