import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import store from '../src/redux/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";

addDecorator((story, context) => withInfo(context.kind)(story)(context))


/**
 * Add support to Redux
 */
const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)
addDecorator(withProvider)

/**
 * Decorator responsable to center all the stories
 */
const styles = { margin: 10 };
const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;
addDecorator(CenterDecorator);



/**
 * Load all story.js files
 */
const req = require.context('../src/', true, /story\.js$/)
function loadStories() {
  req.keys().forEach(req)
}
configure(loadStories, module)
