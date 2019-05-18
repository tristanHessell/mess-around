import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import App from './App';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
Modal.setAppElement('#root');
