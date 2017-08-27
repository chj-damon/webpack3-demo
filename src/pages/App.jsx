import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import Posts from './Posts/Posts';
import About from './About/About';
import PostDetail from './PostDetail/PostDetail';
import NotFound from './NotFound/NotFound';

const App = () => (
    <div>
        <Header />

        <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/posts" component={Posts} />
            <Route path="/about" component={About} />
            <Route path="/post/:slug" component={PostDetail} />
            <Route component={NotFound} />
        </Switch>
    </div>
);
export default App;