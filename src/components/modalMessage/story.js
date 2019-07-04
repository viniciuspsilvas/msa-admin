import React from 'react'
import { storiesOf } from '@storybook/react'
import ModalMessage from './index'
import { action, configureActions } from '@storybook/addon-actions';

const studentList = [
  {
    "studentId": "1",
    "firstname": 'Joao',
    "lastname": 'Silva',
    "fullname": 'Joao Silva',
    "phone": '9999 999 999'
  },
  {
    "studentId": "2",
    "firstname": 'Rodrigo',
    "lastname": 'Pereira',
    "fullname": 'Rodrigo Pereira',
    "phone": '9999 999 999'
  }
]

const receivers = [
  {
    "studentId": "2",
    "firstname": 'Rodrigo',
    "lastname": 'Pereira',
    "fullname": 'Rodrigo Pereira',
    "phone": '9999 999 999'
  }
]

storiesOf('Components/ModalMessage', module)
  .add('default', () =>
    <ModalMessage
      datetime={Date.now()}
      isSendNow={false}
      isOpen={true}
      handleSubmit={action('sendButton-click')}
      handleCancel={action('cancelButton-click')}
      studentList={studentList} />)
  .add('with `TO` filled', () =>
    <ModalMessage
      isSendNow={true}
      isOpen={true}
      handleSubmit={action('sendButton-click')}
      handleCancel={action('cancelButton-click')}
      receivers={receivers}
      studentList={studentList}
      handleInputChange={action('Input-change')}
    />)

