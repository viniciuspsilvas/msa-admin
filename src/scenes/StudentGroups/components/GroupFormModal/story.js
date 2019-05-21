import React from 'react'
import { storiesOf } from '@storybook/react'
import GroupFormModal from './index'
import { action, configureActions } from '@storybook/addon-actions';


storiesOf('GroupScreen/GroupFormModal', module)
.add('default', () =>

<GroupFormModal handleSubmit={() => {}} onSubmit={() => {}} />)

