import React from 'react';
import { Modal, Row } from 'reactstrap';
import { BounceLoader } from 'react-spinners';
import './SpinnerModal.css'


// RENDER
const SpinnerModal = () => {
    const loading= true;

    return (

        <Modal isOpen={loading} className='modal-dialog modal-dialog-centered modal-sm'
            contentClassName='modalStyle' >
            <Row className='d-flex justify-content-center' >
                <BounceLoader loading={loading} name='spinnerModal'
                    color={'white'} />
            </Row>
        </Modal>
    );
}


export default SpinnerModal;