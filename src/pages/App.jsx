import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import Posts from './Posts/Posts';
import About from './About/About';
import NotFound from './NotFound/NotFound';

const App = () => (
    <div>
        <Header />

        <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/posts" component={Posts} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
        </Switch>
    </div>
);
export default App;