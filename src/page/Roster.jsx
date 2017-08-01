import React from 'react';
import { Switch, Route } from 'react-router-dom';

import loadFullRoster from 'bundle-loader?lazy!./FullRoster';
import loadPlayer from 'bundle-loader?lazy!./Player';
import Bundle from '../Bundle';

const FullRoster = props => (
    <Bundle load={loadFullRoster}>
        {FullRoster => <FullRoster {...props} />}
    </Bundle>
);
const Player = props => (
    <Bundle load={loadPlayer}>
        {Player => <Player {...props} />}
    </Bundle>
);

const Roster = () => (
    <Switch>
        <Route exact path="/roster" component={FullRoster} />
        <Route path="/roster/:number" component={Player} />
    </Switch>
);
export default Roster;