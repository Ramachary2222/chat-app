import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import CreateRoomBtnModal from './CreateRoomBtnModal'
import DashboardToggle from './Dashboard/DashboardToggle'
import RoomsList from './Rooms/RoomsList'

function Sidebar() {

    const topSideBarRef = useRef();
    const [height, setheight] = useState(0);

    useEffect(() => {
        if (topSideBarRef.current) {
            setheight(topSideBarRef.current.scrollHeight)
        }
    }, [topSideBarRef])


    return (
        <div className='h-100 pt-2'>

            <div>
                <DashboardToggle />
                <CreateRoomBtnModal />
                <Divider style={{ margin: 0, padding: '30px 0' }}>
                    Join conversation
                </Divider>
            </div>

            <RoomsList aboveElHeight={height} />

        </div>
    )
}

export default Sidebar