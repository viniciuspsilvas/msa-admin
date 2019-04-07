import React from 'react'
import { storiesOf } from '@storybook/react'
import LoginScreen from './index'
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
  dispatch: action('dispatch'),
};


/**
 * This story does'nt work as expected.
 * It's supposed to work with Redux, but it doesn't.
 * ATM thoses input aren't bind their values
 */
storiesOf('LoginScreen', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <LoginScreen />)

