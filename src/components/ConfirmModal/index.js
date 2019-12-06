import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './style.css';

const ModalMessage = props => {
    const {
        title, text, handleToggleModal, handleConfirm,
        isOpen,
        confirmLabel = "Confirm", cancelLabel = "Cancel"
    } = props;

    return (
        <Dialog
            open={isOpen}
            keepMounted
            onClose={handleToggleModal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleToggleModal} >
                    {cancelLabel}
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}


ModalMessage.propTypes = {

    title: PropTypes.string,
    text: PropTypes.string,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    handleToggleModal: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,

};

export default ModalMessage;

