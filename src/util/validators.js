import React from 'react'

export const required = value => (value ? undefined : 'Required!');

export const email = value =>
    value && /(.+)@(.+){2,}\.(.+){2,}/i.test(value)
        ? undefined
        : 'Invalid email!';
