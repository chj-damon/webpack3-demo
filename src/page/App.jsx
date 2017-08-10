import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import loadHome from 'bundle-loader?lazy!./Home';
import loadRoom from 'bundle-loader?lazy!./Room';
import Bundle from '../Bundle';

const Home = props => (
    <Bundle load={loadHome}>
        {Home => <Home {...props} />}
    </Bundle>
);
const Room = props => (
    <Bundle load={loadRoom}>
        {Room => <Room {...props} />}
    </Bundle>
);

class App extends PureComponent {
    render() {
        return ( 
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/rooms/:id" component={Room} />
                </Switch>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default App;