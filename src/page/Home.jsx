import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRoomList } from '../redux/actions/room';

import RoomsList from './RoomsList';

class Home extends PureComponent {
    componentDidMount() {
        if (this.props.rooms.length === 0) {
            this.props.fetchRoomList();
        }
    }
    render() {
        return (
            <div className="page">
                <h2>欢迎来到聊天室，请选择您感兴趣的房间</h2>
                <RoomsList 
                    rooms={this.props.rooms}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    rooms: state.roomsReducer.rooms
});
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoomList
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);