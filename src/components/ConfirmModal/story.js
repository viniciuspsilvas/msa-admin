import React from 'react'
import { storiesOf } from '@storybook/react'
import ConfirmModal from './index'
import { action, configureActions } from '@storybook/addon-actions';


storiesOf('Components/ConfirmModal', module)
  .add('default', () =>
    <ConfirmModal
      isOpen={true}
      title="Title Modal"
      text="Tesste das sdsda sdfds xcv?"
      handleToggleModal={action('handleToggleModal')}
      handleConfirm={action('handleConfirm')}
Í    />)
