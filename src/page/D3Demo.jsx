import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import './d3.less';

class D3Demo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [4, 8, 15, 16, 23, 42]
        };
    }
    componentDidMount() {
        d3.select('.chart')
            .selectAll('div')
            .data(this.state.data)
            .enter()
            .append('div')
            .style('width', d => `${d * 10}px`)
            .text(d => d);
    }
    
    render() {
        return (
            <div className="chart" />
        );
    }
}
export default D3Demo;