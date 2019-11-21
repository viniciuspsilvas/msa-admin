import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Container,
    Button
} from 'reactstrap';


import { Email, Call } from '@material-ui/icons';

import './style.css';

const ListStudentsModal = props => {
    const {
        isOpen = true,
        handleToggleModal,
        course,
        studentList

    } = props;

    const listItems = studentList.map((enroll) =>
        <div className="contain" key={enroll._id} >
            <div className="headerList">{enroll.student.fullname}</div>
            <div className="bodyList">
                <span style={{ display: '-webkit-inline-box', width: 300 }}>
                    <Email fontSize='small' /> {enroll.student.email}
                </span>
                <span >
                    <Call fontSize='small' /> {enroll.student.phone}
                </span>
            </div>
        </div>
    );

    return (
        <Container>
            <Modal isOpen={isOpen} id='modalMsg' toggle={handleToggleModal} >
                <ModalHeader>Enrolled - {course}</ModalHeader>
                <ModalBody>

                    {studentList.length > 0 ? listItems : <div className='noEnrollFound'>No enrollment found.</div>}

                </ModalBody>
                <ModalFooter>

                    {studentList.length > 0 && <span className='totalText'>Total: {studentList.length}</span>}

                    <Button color="primary" className="float-right" onClick={handleToggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}

export default ListStudentsModal;

ListStudentsModal.propTypes = {
    studentList: PropTypes.array.isRequired,
    course: PropTypes.string.isRequired
};
