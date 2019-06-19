import React from 'react';
import InputLabeled from '../../../../components/InputLabeled'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import { Form, Label, Row, Col, Container, Button } from 'react-bootstrap';
import './style.css'

const TaskSchedulerPanel = ({ name, weekDay, time, message, lastExec, isActive }) => {

  return (
    <Paper elevation={1} style={{ padding: 1 + 'em' }} >
      <Container>
        <Row>
          <Typography variant="h5" component="h3">
            {name}
          </Typography>
        </Row>
        <Row>
          <Form.Label>Message</Form.Label>
        </Row>
        <Row>
          <Form.Control as="textarea" placeholder="Enter message" rows="3" />
        </Row>

        <Row>
          <Col>
            <Form.Label>Week Day</Form.Label>
            <input>{weekDay}</input>
          </Col>

          <Col>
            <Form.Label>Time</Form.Label>
            <input>{time}</input>
          </Col>

          <Col>
            <Form.Label>Enable</Form.Label>
            <input>{isActive}</input>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label>Last time:</Form.Label>
          </Col>

          <Col>
            <Form.Label>{lastExec}</Form.Label>
          </Col>

          <Col>
            <Button>Save</Button>
          </Col>
        </Row>

      </Container>
    </Paper>
  )
}

TaskSchedulerPanel.propTypes = {
};

export default TaskSchedulerPanel