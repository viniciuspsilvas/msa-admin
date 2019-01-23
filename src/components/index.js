import React from 'react'
import {Label, Input } from 'reactstrap';

export const inputLabeled = ({ input, label, meta: { touched, error }, ...custom }) => {
    const hasError = touched && error !== undefined;

    return (
        <div>
            <Label for="name">{label}</Label>
            <Input
                invalid={hasError}
                {...input}
                {...custom}
            />
            {hasError && <p style={{ color: 'red' }}>{error}</p>}
            
        </div>
    )
}