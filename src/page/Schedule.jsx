import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class Schedule extends PureComponent {
    handleClick = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ul>
                    <li>6/5 @ Evergreens</li>
                    <li>6/8 vs Kickers</li>
                    <li>6/14 @ United</li>
                </ul>
                <button onClick={this.handleClick}>back</button>
            </div>
        );
    }
}
export default withRouter(Schedule);