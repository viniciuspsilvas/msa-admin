import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

//import TextField from './components/TextField'

import ModalMessage from './container/modalMessage'

ReactDOM.render(<ModalMessage />, document.getElementById('root'));
registerServiceWorker();
