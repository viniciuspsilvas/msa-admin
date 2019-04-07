import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

import { Provider } from "react-redux";
import store from './redux/configureStore'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

registerServiceWorker();