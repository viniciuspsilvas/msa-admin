import React from 'react'
import { storiesOf } from '@storybook/react'
import StudentsForm from './index'
import { Provider } from "react-redux";
import { action } from '@storybook/addon-actions';

const store = {
  getState: () => {
    return {
      loginReducer: {
        loading: false
      }
    };
  },
  subscribe: () => 0,
  dispatch: action('d@@@@@ispatch'),
};


storiesOf('Student/StudentsForm', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <StudentsForm studentId="1" />)
