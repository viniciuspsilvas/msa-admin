import React from 'react';
import { Modal, Row } from 'reactstrap';
import { BounceLoader } from 'react-spinners';
import './SpinnerModal.css'

class SpinnerModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: this.props.loading,
        };
    }

    // RENDER
    render() {
        const { loading } = this.state;

        return (

            <Modal isOpen={loading} className='modal-dialog modal-dialog-centered modal-sm'
                contentClassName='modalStyle' >
                <Row className='d-flex justify-content-center' >
                    <BounceLoader loading={loading} name='spinnerModal'
                        color={'red'} />
                </Row>
            </Modal>
        );
    }
}

export default SpinnerModal;