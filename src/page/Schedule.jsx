import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Immutable from 'seamless-immutable';

class Schedule extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            arry: Immutable([1, 2, 3])
        };
    }

    addProps = () => {
        // const array = Immutable(['drop the numbers!', 3, 2, 1, 0, null, undefined]);
        // const newArry = Immutable.flatMap(array, (value) => {
        //     if (typeof value === 'number') {
        //         return [];
        //     }
        //     return value;
        // });
        const array = Immutable(['a', 'b', 'c', 'd']);
        // const newArry = Immutable.asObject(array, str => [str, `${str}-${str}`]);
        const newArry = Immutable.asObject(array);
        console.log(newArry);
    }

    handleClick = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                {this.state.arry.join(',')}
                <button onClick={this.addProps}>添加属性</button>
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