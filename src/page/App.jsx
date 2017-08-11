import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'antd';

import Home from './demo/Home';
import About from './demo/About';
import Topics from './demo/Topics';

const App = () => (
    <Router>
        <div>
            <Menu 
                theme="dark" 
                mode="horizontal"
            >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/topics">Topics</Link></Menu.Item>
            </Menu>
  
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);
export default App;