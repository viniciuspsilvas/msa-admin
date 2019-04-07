import React from 'react'
import { storiesOf } from '@storybook/react'
import LoginForm from './index'
import { action } from '@storybook/addon-actions';

storiesOf('LoginScreen/LoginForm', module)
  .add('default', () => <LoginForm handleSubmit={action('clicked')} />)