import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Alert } from 'reactstrap';

class AlertBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        const { error } = this.props;

        if (error) {
            return (
                <Alert color="danger" 
                    className="box"
                    isOpen={this.state.visible} 
                    toggle={this.onDismiss}>
                    {error.message}
                </Alert>
            );
        } else {
            return <div />
        }
    }
}

AlertBox.propTypes = {
    //error: PropTypes.object.isRequired,
};

export default AlertBox;