import React from 'react'
import TimeAgo from 'timeago-react';

function RoomItem({ room }) {

    const { CreatedAt, name } = room;

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className='text-disappear'>{name}</h5>
                <TimeAgo datetime={new Date(CreatedAt)} className="font-normal text-black-45" />
            </div>
            <div className='d-flex align-items-center text-black-70'>
                <span>No messages yet ....</span>
            </div>

        </div>

    )
}

export default RoomItem