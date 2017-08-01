import React from 'react';
import { Switch, Route } from 'react-router-dom';

import loadHome from 'bundle-loader?lazy!../Home';
import loadRoster from 'bundle-loader?lazy!../Roster';
import loadSchedule from 'bundle-loader?lazy!../Schedule';
import Bundle from '../../Bundle';

const Home = props => (
    <Bundle load={loadHome}>
        {Home => <Home {...props} />}
    </Bundle>
);
const Roster = props => (
    <Bundle load={loadRoster}>
        {Roster => <Roster {...props} />}
    </Bundle>
);
const Schedule = props => (
    <Bundle load={loadSchedule}>
        {Schedule => <Schedule {...props} />}
    </Bundle>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/roster" component={Roster} />
            <Route path="/schedule" component={Schedule} />
        </Switch>
    </main>
);
export default Main;