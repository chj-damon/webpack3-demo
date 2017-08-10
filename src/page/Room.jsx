import io from 'socket.io-client';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Codemirror from 'react-codemirror';  
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
import { getChallenges } from '../redux/actions/challenge';

const socket = io();
class Room extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
        socket.on('receive code', payload => this.updateCodeFromSocket(payload));
    }
    componentDidMount() {
        if (this.props.challenge.id === undefined) {
            this.props.getChallenges();
        } else {
            socket.emit('room', {
                room: this.props.challenge.id
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        socket.emit('room', {
            room: nextProps.challenge.id
        });
    }
    componentWillUnmount() {
        socket.emit('leave', {
            room: this.props.challenge.id
        });
    }

    updateCodeFromSocket = (payload) => {
        this.setState({ code: payload.newCode });
    }

    handleChange = (newText) => {
        this.setState({ code: newText });
        socket.emit('coding', {
            room: this.props.challenge.id,
            newCode: newText
        });
    };

    render() {
        const options = {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        };
        return (
            <div>
                <h1>{this.props.challenge.title}</h1>
                <p>{this.props.challenge.description}</p>
                <Codemirror 
                    value="hello world!"
                    onChange={this.handleChange} 
                    options={options} 
                />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const challenges = state.challengesReducer.challenges;
    if (challenges.length > 0) {
        const challenge = challenges.filter(challenge => challenge.id === ownProps.params.id)[0];
        return { challenge };
    }
    return {
        challenge: {
            title: '',
            description: ''
        }
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({
    getChallenges
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Room);