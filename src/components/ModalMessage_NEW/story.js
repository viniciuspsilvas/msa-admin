import React from 'react'
import { storiesOf } from '@storybook/react'
import ModalMessage from './index'
import { action, configureActions } from '@storybook/addon-actions';

storiesOf('Components/ModalMessage_new', module)
  .add('default', () =>
    <ModalMessage onSend={action('sendButton-click')} />)