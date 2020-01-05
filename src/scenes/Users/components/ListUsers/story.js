import React from 'react'
import { storiesOf } from '@storybook/react'
import ListUsers from './index'

const listUsers = [
  {
    _id: "324242342",
    email: 'viniciuspsilvas@gmail.com',
    lastname: 'Silva',
    firstname: 'Vinicius',
    username: 'viniciuspsilvas',
    password: 'Password123!',
  }, {
    _id: "32424234299",
    email: 'lina@mindroom.edu.au',
    lastname: 'Barbeta',
    firstname: 'Lina',
    username: 'lina',
    password: 'Password123!',
  }
]

storiesOf('SettingsScreen/Users/ListUsers', module)
  .add('default', () =>
    <ListUsers list={listUsers} />)
  .add('empty', () =>
    <ListUsers list={[]} />)

