import React from 'react'
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../ProfileAvatar';

function RoomItem({ room }) {

    const { CreatedAt, name, LastMessage } = room;

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className='text-disappear'>{name}</h5>
                <TimeAgo datetime={LastMessage ? new Date(LastMessage.CreatedAt) : new Date(CreatedAt)} className="font-normal text-black-45" />
            </div>
            <div className='d-flex align-items-center text-black-70'>

                {
                    LastMessage ?
                        <>
                            <div className='d-flex align-items-center'>
                                <ProfileAvatar circle src={LastMessage.author.avatar} name={LastMessage.author.name} size="sm" />
                            </div>
                            <div className='text-disappear ml-2'>
                                <div className='italic'>
                                    {LastMessage.author.name}
                                </div>
                                <span>{LastMessage.text || LastMessage.file.name}</span>
                            </div>
                        </>
                        : <span>No Messages yet ....</span>

                }
            </div>

        </div>

    )
}

export default RoomItem