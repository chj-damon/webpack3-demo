import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './page/App';
import Bundle from './Bundle';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/rooms/:id" component={Room} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);