import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { fetchConfigList } from "./actions";
import { Container } from 'reactstrap';
import SpinnerModal from '../../components/SpinnerModal';

class Settings extends Component {

    componentDidMount() {
        // this.props.fetchConfigList();
    }

    render() {
        const { error, loading } = this.props;

        if (error) { return <div>Error! {error.message}</div> }
        if (loading) { return <SpinnerModal /> }

        return (
            <Container >
                <h1>Settings</h1>

            </Container>
        );
    }
}


//Redux configuration
const mapStateToProps = state => ({ ...state.settingsReducer, ...state.loginReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchConfigList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

