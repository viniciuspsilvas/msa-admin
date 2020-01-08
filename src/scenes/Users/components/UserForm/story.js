import React from 'react'
import { storiesOf } from '@storybook/react'
import UserForm from './index'


const user = {
  _id : "",
  password : "teste123!",
  email : "viniciuspsilvas@gmail.com",
  //firstname : "Vinicius",
  lastname : "Silva",
  isActive : true,
  isAdmin : true,
}

storiesOf('SettingsScreen/Users/UserForm', module)
  .add('default', () =>
    <UserForm user={user} />)

