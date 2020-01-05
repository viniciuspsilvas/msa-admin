import React from 'react'
import { storiesOf } from '@storybook/react'
import Users from './index'

storiesOf('SettingsScreen/Users/', module)
  .add('default', () =>
    <Users />)

