import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import SpinnerModal from '../../components/SpinnerModal';
import { fetchStudentList, togleModalMessage, sendNotification } from "./actions";
import { connect } from "react-redux";


class ModalMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.props.fetchStudentList();
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

        // Prepare data to be sent to backend
        const { title, body, severity, studentsSelected } = this.state
        let data = { title, body, severity, "receivers": studentsSelected }

        this.props.sendNotification(data);
        this.props.togleModalMessage();
        this.resetForm();
    }

    // RENDER
    render() {
        const { error, isLoading, studentList, isOpen } = this.props;

        const { studentsSelected, severity, title, body } = this.state;

        if (error) { return <p>{error.message}</p> }
        if (isLoading) { return <SpinnerModal loading={isLoading} /> }

        const cancelButton = () => {
            this.props.togleModalMessage();
            // this.resetForm();
        }

        return (
            <Container>
                <Modal isOpen={isOpen} toggle={this.props.togleModalMessage} className={this.props.className}>
                    <ModalHeader toggle={this.props.togleModalMessage}>Quick Message</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="toIpt">To</Label>

                                <Typeahead
                                    labelKey="fullname"
                                    options={studentList}
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
                                    onChange={this.handleInputChange}
                                    value={title} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="textIpt">Body</Label>
                                <Input type="textarea" name="body" id="textIpt"
                                    onChange={this.handleInputChange}
                                    value={body} />
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

//Redux configuration
const mapStateToProps = state => {
    return state.modalMessageReducer;
};

const mapDispatchToProps = dispatch => ({
    fetchStudentList: () => dispatch(fetchStudentList()),
    togleModalMessage: () => dispatch(togleModalMessage()),
    sendNotification: (data) => dispatch(sendNotification(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage);
