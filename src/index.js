import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import rootReducer from './Game/reducers/reducers.js'
import configureStore from './Game/configureStore'
import App from './App';

import './index.css';

let store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
