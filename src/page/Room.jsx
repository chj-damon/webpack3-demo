import io from 'socket.io-client';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button } from 'antd';

import { fetchRoomsList } from '../redux/actions/room';

const { TextArea } = Input;
const socket = io();
class Room extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
    }
    componentDidMount() {
        socket.on('receive', this.updateCodeFromSocket);
        if (this.props.room.id === undefined) {
            this.props.fetchRoomsList();
        } else {
            socket.emit('room', {
                room: this.props.room.id
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        socket.emit('room', {
            room: nextProps.room.id
        });
    }
    componentWillUnmount() {
        socket.emit('leave', {
            room: this.props.room.id
        });
    }

    updateCodeFromSocket = (payload) => {
        console.log(payload);
        // this.setState({ code: payload.newCode });
    }

    handleChange = (newText) => {
        this.setState({ code: newText });
        socket.emit('coding', {
            room: this.props.room.id,
            newCode: newText
        });
    };

    render() {
        return (
            <div className="room-content">
                <div className="room-title">房间号( {this.props.room.id} )</div>
                <div className="room-news-list-content">
                    <div className="news-list">消息列表</div>
                    <div className="news-send">
                        <TextArea rows={3} />
                        <Button>发送</Button>
                    </div>
                </div>
                <div className="room-person-list-content">
                    <div className="person-total">房间总人数(  )</div>
                    <div className="person-list">房间内人员列表</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const rooms = state.roomsReducer.rooms;
    if (rooms.length > 0) {
        const room = rooms.filter(room => room.id === ownProps.match.params.id)[0];
        return { room };
    }
    return {
        room: {
            title: '',
            description: ''
        },
        newsList: state.roomsReducer.newsList,
        userList: state.roomsReducer.userList
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoomsList
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Room);