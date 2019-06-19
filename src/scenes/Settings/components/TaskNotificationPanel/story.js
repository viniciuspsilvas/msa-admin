import React from 'react'
import { storiesOf } from '@storybook/react'
import TaskNotificationPanel from './index'

storiesOf('TaskNotificationPanel', module)
  .add('default', () => <TaskNotificationPanel name={"Attendance Notifications"} />)
