import React from 'react'
import { storiesOf } from '@storybook/react'
import AlertBox from './index'
//import { action, configureActions } from '@storybook/addon-actions';


storiesOf('Components/AlertBox', module)
  .add('default', () => <AlertBox error={true} />)
