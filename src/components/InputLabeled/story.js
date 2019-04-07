import React from 'react'
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import InputLabeled from './index'

storiesOf('InputLabeled', module)
    .addDecorator(withKnobs)
    .add('default', () => <InputLabeled 
    meta={[true, false]}
    value= {text('Label', 'Input something')}
     label='Label' 
    
    />)
    .add('erro=true', () => <InputLabeled meta={{ touched: true, error: "Field invalid!" }} label='Label' />)
    .add('isRequired', () => <InputLabeled meta={[true, false]} label='Label' isRequired />)



