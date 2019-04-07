import React from 'react'
import Form from 'react-bootstrap/Form'
import './style.css'


const InputLabeled = ({ input, label, required, meta: { touched, error }, ...custom }) => {
    const hasError = touched && error !== undefined;

    const styleLabel = hasError ? 'labelErro' : 'label';

    return (
        <div>
            <Form.Group controlId="formBasicEmail">
                <Form.Label className={styleLabel}>{label}{required && '*'}</Form.Label>
               
                <Form.Control
                    isInvalid={hasError}
                    {...input}
                    {...custom}
                />
                <span className="msgErro">{touched &&
                    ((error && <span>{error}</span>))}
                </span>
            </Form.Group>

        </div>
    )
}


InputLabeled.propTypes = {
};

export default InputLabeled;

