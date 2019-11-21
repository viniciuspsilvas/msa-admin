import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { unregister } from './registerServiceWorker';
import App from './App';

import ErrorBoundary from './util/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

import { Provider } from "react-redux";
import { store, persistor } from './redux/configureStore'

import { PersistGate } from "redux-persist/integration/react";

unregister();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
  , document.getElementById('root')
);
