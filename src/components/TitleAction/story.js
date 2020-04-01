import React from 'react'
import { storiesOf } from '@storybook/react'
import TitleAction from './index'
import { Button } from 'reactstrap';
import { action } from '@storybook/addon-actions';

storiesOf('Components/TitleAction', module)
  .add('default', () =>
    <TitleAction title="Courses">
      <Button color="primary" onClick={action("New")}>New</Button>
    </TitleAction>


  )