import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/img/room.jpg';

const RoomsList = ({ rooms }) => (
    <div className="room-list-content">
        {
            rooms.map(room => 
                (<div key={room.id} className="room">
                    <Link to={`/rooms/${room.id}`}>
                        <img src={home} alt={room.name} />
                        <span>{room.name}</span>
                    </Link>
                </div>)
            )
        }
    </div>
);
export default RoomsList;