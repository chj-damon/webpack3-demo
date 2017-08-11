import React, { PureComponent } from 'react';

class App extends PureComponent {
    render() {
        return ( 
            <div className="app">
                <h1>App</h1>
                {this.props.children}
            </div>
        );
    }
}
export default App;