import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom'

import { Icon } from "@material-ui/core";
import adminIcon from '../../../../images/admin-icon.svg';
import { Delete } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

export default function UserForm() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <Container>
            <Row className="align-items-center">
                <Col xs="6" style={{ textAlign: "center" }}>

                    <Icon >
                        <img src={adminIcon} height={300} width={300} />
                    </Icon>
                </Col>

                <Col xs="6">
                    <Form className="form-horizontal" >
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtName">First name*</label>
                                    <div>
                                        <input id="txtName" name="firstname" type="text" maxLength='50' className="form-control input-md" />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtName">Last name</label>
                                    <div>
                                        <input id="txtName" name="lastname" type="text" maxLength='50' className="form-control input-md" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="form-group">
                            <label className="control-label" htmlFor="txtEmail">Email*</label>
                            <div>
                                <input id="txtEmail" name="email" type="text" maxLength='100' className="form-control input-md" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label" htmlFor="txtUsername">Username*</label>
                            <div>
                                <input id="txtUsername" name="username" type="text" maxLength='50' className="form-control input-md" />
                            </div>
                        </div>

                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtPassword">Password*</label>
                                    <div>
                                        <input id="txtPassword" name="password" type="password" maxLength='30' className="form-control input-md" />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtConfirPass">Confirm Password*</label>
                                    <div>
                                        <input id="txtConfirPass" name="password2" type="password" maxLength='30' className="form-control input-md" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="form-check">
                                <input id="chkPassword" name="isAdmin" type="checkbox" className="form-check-label" />
                                {' '}
                                <label className="control-label" htmlFor="chkPassword">Admin</label>
                            </Col>
                            <Col className="form-check">
                                <input id="chkActive" name="isActive" type="checkbox" className="form-check-label" />
                                {' '}
                                <label className="control-label" htmlFor="chkActive">Active</label>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '20px' }}>
                            <Col>
                                <Link to="/students">
                                    <div style={{ textAlign: 'right' }} >
                                        <Button color="primary" >Save</Button>
                                    </div>
                                </Link>
                            </Col>

                            <Col>
                                <Link to="/students">
                                    <Button id="btnCancel" name="btnCancel" color="secondary" >Back</Button>
                                </Link>

                                <span style={{ float: 'right', }} >
                                    <Tooltip title="Delete">
                                        <Delete style={{ cursor: 'pointer', color:'#dc3545' }} />
                                    </Tooltip>
                                </span>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
}