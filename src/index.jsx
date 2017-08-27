import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'normalize.css';
import './base.css';
import App from './pages/App';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);