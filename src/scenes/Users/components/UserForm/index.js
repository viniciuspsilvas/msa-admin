import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom'

import { Icon } from "@material-ui/core";
import adminIcon from '../../../../images/admin-icon.svg';
import { Delete } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

import { saveUser } from "../../actions";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";

import SpinnerModal from '../../../../components/SpinnerModal';
import AlertBox from '../../../../components/AlertBox'

import { showSuccess } from "../../../../components/AlertApp/actions"

export default function UserForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    let { id } = useParams();

    const { loading, error } = useSelector(state => state.userReducer);
    const { register, handleSubmit, errors, watch } = useForm();

    useEffect(() => {
        /*     dispatch(fetchUserList())
                .then(result => {
                    setList(result);
                }) */

        console.log("id =>", id);

    }, []);


    const onSubmit = (data) => {

        const {
            email,
            password,
            firstname,
            lastname,
            isActive,
            isAdmin
        } = data;

        dispatch(saveUser({
            email,
            password,
            firstname,
            lastname,
            isActive,
            isAdmin
        }))
            .then(result => {
                if (result) {
                    dispatch(showSuccess(`User successfully created.`));
                    history.push('/settings/users');
                }
            })
    };


    const InvalidFeedback = ({ field }) => (
        (errors[field] && errors[field].message)
            ?
            <div className="invalid-feedback"> {errors[field].message} </div>
            :
            <span />
    )

    if (loading) { return <SpinnerModal /> }
    if (error) { return <AlertBox error={error} /> }

    return (
        <Container>
            <Row className="align-items-center">
                <Col xs="6" style={{ textAlign: "center" }}>
                    <Icon >
                        <img src={adminIcon} height={300} width={300} alt='Admin' />
                    </Icon>
                </Col>

                <Col xs="6">
                    <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} >
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtFirstname">First name*</label>
                                    <div>
                                        <input
                                            id="txtFirstname"
                                            name="firstname"
                                            type="text"
                                            maxLength='50'
                                            className={`form-control input-md ${errors.firstname && 'is-invalid'}`}
                                            ref={register({ required: true, maxLength: 80 })}
                                        />
                                        <InvalidFeedback field='firstname' />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtLastname">Last name*</label>
                                    <div>
                                        <input
                                            id="txtLastname"
                                            name="lastname"
                                            type="text"
                                            maxLength='50'
                                            className={`form-control input-md ${errors.lastname && 'is-invalid'}`}
                                            ref={register({ required: true, maxLength: 100 })}
                                        />
                                        <InvalidFeedback field='lastname' />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="form-group">
                            <label className="control-label" htmlFor="txtEmail">Email*</label>
                            <div>
                                <input id="txtEmail"
                                    name="email"
                                    type="text"
                                    maxLength='100'
                                    className={`form-control input-md ${errors.email && 'is-invalid'}`}
                                    ref={register({ required: true, pattern: { value: /^\S+@\S+$/i, message: 'Invalid email.' } })}
                                />
                                <InvalidFeedback field="email" />
                            </div>
                        </div>

                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtPassword">Password*</label>
                                    <div>
                                        <input id="txtPassword" name="password" type="password" maxLength='30'
                                            className={`form-control input-md ${errors.password && 'is-invalid'}`}
                                            ref={register({ required: true })}
                                        />
                                        <InvalidFeedback field="password" />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="txtConfirPass">Confirm Password*</label>
                                    <div>
                                        <input id="txtConfirPass" name="password2" type="password" maxLength='30'
                                            className={`form-control input-md ${errors.password2 && 'is-invalid'}`}
                                            ref={register({
                                                required: true,
                                                validate: (value) => value === watch('password') || `Password doesn't match.`
                                            })}
                                        />
                                        <InvalidFeedback field="password2" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="form-check">
                                <input id="chkPassword" name="isAdmin" type="checkbox" className="form-check-label" ref={register} />
                                {' '}
                                <label className="control-label" htmlFor="chkPassword">Admin</label>
                            </Col>
                            <Col className="form-check">
                                <input id="chkActive" name="isActive" type="checkbox" className="form-check-label" ref={register} />
                                {' '}
                                <label className="control-label" htmlFor="chkActive">Active</label>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '20px' }}>
                            <Col>
                                <div style={{ textAlign: 'right' }} >
                                    <Button color="primary"
                                        type="submit">
                                        Save
                                    </Button>
                                </div>
                            </Col>

                            <Col>
                                <Link to={`/settings/users`}>
                                    <Button id="btnCancel" name="btnCancel" color="secondary">Back</Button>
                                </Link>

                                <span style={{ float: 'right', }} >
                                    <Tooltip title="Delete">
                                        <Delete style={{ cursor: 'pointer', color: '#dc3545' }} />
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