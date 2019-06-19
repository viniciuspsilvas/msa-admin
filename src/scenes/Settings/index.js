import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchConfigList } from "./actions";
import { Container } from 'reactstrap';
import { Switch } from '@material-ui/core';

class Settings extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchConfigList();
    }

    render() {
        const { error, loading, taskSchedulerList } = this.props;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Settings</h1>
                <Papel>
                    <Header>Attendance Notification</Header>
                    <Label></Label>
                    <CampoArea></CampoArea>

                    <Row>
                        <Col>
                            <Label></Label>
                            <CampoData></CampoData>
                        </Col>

                        <Col>
                            <Label></Label>
                            <CampoData></CampoData>
                        </Col>

                        <Col>
                            <Label></Label>
                            <Switch></Switch>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Label></Label>
                        </Col>

                        <Col>
                            <Label></Label>
                        </Col>

                        <Col>
                            <Botao></Botao>
                        </Col>
                    </Row>
                </Papel>
            </Container>
        );
    }
}


//Redux configuration
const mapStateToProps = state => ({ ...state.settingsReducer, ...state.loginReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchConfigList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

