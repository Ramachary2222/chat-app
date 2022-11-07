import React from 'react'
import { Nav } from 'rsuite'
import RoomItem from './RoomItem'

function RoomsList({ aboveElHeight }) {
    return (
        <Nav
            appearance="subtle"
            vertical
            reversed
            className="overflow-y-scroll custom-scroll"
            style={{
                height: `calc(100% - ${aboveElHeight}px)`
            }}>
            <Nav.Item>
                <RoomItem />
            </Nav.Item>
        </Nav>
    )
}

export default RoomsList