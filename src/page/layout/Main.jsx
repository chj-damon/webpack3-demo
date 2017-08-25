import React from 'react';
import { Switch, Route } from 'react-router-dom';

import loadHome from 'bundle-loader?lazy!../Home';
import loadRoster from 'bundle-loader?lazy!../Roster';
import loadSchedule from 'bundle-loader?lazy!../Schedule';
import loadD3 from 'bundle-loader?lazy!../D3Demo';
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
const D3Demo = props => (
    <Bundle load={loadD3}>
        {Comp => <Comp {...props} />}
    </Bundle>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/roster" component={Roster} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/d3" component={D3Demo} />
        </Switch>
    </main>
);
export default Main;