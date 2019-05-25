import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import configureStore from './redux/store';
import './index.css';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

  Modal.setAppElement('#root');
