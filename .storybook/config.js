import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../src/redux/rootReducer";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());
addDecorator((story, context) => withInfo(context.kind)(story)(context))

const courseList = [
  {
    name: 'Project Management',
    description: 'Project Management description',
    id: 1
  }
]

const studentList = [
  {
    "studentId": "1",
    "firstname": 'Joao',
    "lastname": 'Silva',
    "fullname": 'Joao Silva',
    "phone": '9999 999 999'
  },
  {
    "studentId": "2",
    "firstname": 'Rodrigo',
    "lastname": 'Pereira',
    "fullname": 'Rodrigo Pereira',
    "phone": '9999 999 999'
  }
]

const mockStore = {
  studentReducer: { studentList: studentList },
  studentGroupReducer: { courseList: courseList }
}

const store = createStore(rootReducer, mockStore, applyMiddleware(thunk));

store.dispatch

/**
 * Add support to Redux
 */
const withProvider = (story) => (<Provider store={store}> {story()} </Provider>)
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
