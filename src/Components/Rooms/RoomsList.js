import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite'
import { useRooms } from '../../context/rooms.context'
import RoomItem from './RoomItem'

function RoomsList({ aboveElHeight }) {

    const rooms = useRooms();
    const Location = useLocation();

    return (
        <Nav
            appearance="subtle"
            vertical
            reversed
            className="overflow-y-scroll custom-scroll"
            style={{
                height: `calc(100% - ${aboveElHeight}px)`
            }}
            activeKey={Location.pathname}
        >
            {!rooms && <Loader center vertical content="Loading" speed="slow" />}

            {rooms && rooms.length > 0 &&
                rooms.map(room =>
                    <Nav.Item key={room.id} componentClass={Link} to={`/chat/${room.id}`} eventKey={`/chat/${room.id}`}>
                        <RoomItem room={room} />
                    </Nav.Item>)}

        </Nav>
    )
}

export default RoomsList