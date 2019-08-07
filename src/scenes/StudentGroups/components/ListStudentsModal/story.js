import React from 'react'
import { storiesOf } from '@storybook/react'
import ListStudentsModal from './index'
import { action, configureActions } from '@storybook/addon-actions';

const studentList = [
  {
    email: 'lifemagalhaes@gmail.com',
    lastname: 'Marganelli',
    firtsname: 'Guilherme',
    username: 'lifemagalhaes',
    password: 'Password123!',
    fullname: 'Guilherme Magalhaes Marganelli',
    phone: '0451472462'
  }, {
    email: 'gustavobarbeta@gmail.com',
    lastname: 'Barbeta',
    firtsname: 'Gustavo',
    username: 'gustavobarbeta',
    password: 'Password123!',
    fullname: 'Gustavo Aguiar Barbeta',
    phone: '0451472462'
  }
]

storiesOf('GroupScreen/ListStudentsModal', module)
  .add('default', () =>
    <ListStudentsModal course={"Advanced Diploma of Graphic Design"}
      studentList={studentList} />)
  .add('empty', () =>
    <ListStudentsModal course={"Advanced Diploma of Graphic Design"}
      studentList={[]} />)

