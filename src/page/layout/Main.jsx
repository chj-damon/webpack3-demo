import React from 'react';
import { Switch, Route } from 'react-router-dom';

import loadHome from 'bundle-loader?lazy!../Home';
import loadRoster from 'bundle-loader?lazy!../Roster';
import loadSchedule from 'bundle-loader?lazy!../Schedule';
import loadSheet from 'bundle-loader?lazy!../Sheet';
import Bundle from '../../Bundle';

const Home = props => (
    <Bundle load={loadHome}>
        {Comp => <Comp {...props} />}
    </Bundle>
);
const Roster = props => (
    <Bundle load={loadRoster}>
        {Comp => <Comp {...props} />}
    </Bundle>
);
const Schedule = props => (
    <Bundle load={loadSchedule}>
        {Comp => <Comp {...props} />}
    </Bundle>
);
const Sheet = props => (
    <Bundle load={loadSheet}>
        {Comp => <Comp {...props} />}
    </Bundle>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/roster" component={Roster} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/sheet" component={Sheet} />
        </Switch>
    </main>
);
export default Main;