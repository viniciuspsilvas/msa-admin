import React from 'react'
import { storiesOf } from '@storybook/react'
import ListUsers from './index'

storiesOf('SettingsScreen/Users/UserForm', module)
  .add('default', () =>
    <ListUsers />)

