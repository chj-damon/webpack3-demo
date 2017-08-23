import './style.less';
import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'antd';

import Bundle from '../Bundle';
// import loadHome from 'bundle-loader?lazy!./demo/Home';
// import loadAbout from 'bundle-loader?lazy!./demo/About';
// import loadTopics from 'bundle-loader?lazy!./demo/Topics';

// const Home = props => (
//     <Bundle load={loadHome}>
//         {Comp => <Comp {...props} />}
//     </Bundle>
// );
// const About = props => (
//     <Bundle load={loadAbout}>
//         {Comp => <Comp {...props} />}
//     </Bundle>
// );
// const Topics = props => (
//     <Bundle load={loadTopics}>
//         {Comp => <Comp {...props} />}
//     </Bundle>
// );

import loadHome from 'bundle-loader?lazy!./Home';
import loadRoom from 'bundle-loader?lazy!./Room';

const Home = props => (
    <Bundle load={loadHome}>
        {Comp => <Comp {...props} />}
    </Bundle>
);
const Room = props => (
    <Bundle load={loadRoom}>
        {Comp => <Comp {...props} />}
    </Bundle>
);

const App = () => (
    <Router>
        <div>
            <Menu 
                theme="dark" 
                mode="horizontal"
            >
                <Menu.Item key="1"><Link to="/">首页2</Link></Menu.Item>
            </Menu>
  
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/rooms/:id" component={Room} />
        </div>
    </Router>
);
export default App;