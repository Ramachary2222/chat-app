import React from 'react'
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatTop from '../../Components/Chat-Window/Top';
import ChatBottom from '../../Components/Chat-Window/Bottom';
import Messages from '../../Components/Chat-Window/Messages';
import { useRooms } from '../../context/rooms.context';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { auth } from '../../misc/firebase';
import { transformToArr } from '../../helpers';

function Chat() {

    const { chatId } = useParams();

    const rooms = useRooms();

    if (!rooms) {
        return <Loader center vertical size="md" content="Loading" speed='slow' />
    }

    const currentroom = rooms.find(room => room.id === chatId);

    if (!currentroom) {
        return <h6 className='text-center mt-page'>Chat {chatId} was not found</h6>
    }
    const { name, description } = currentroom;

    const admins = transformToArr(currentroom.admins);

    const isAdmin = admins.includes(auth.currentUser.uid)


    const CurrentRoomdata = {
        name,
        description,
        admins,
        isAdmin
    }


    return (
        <CurrentRoomProvider data={CurrentRoomdata}>
            <div className='chat-top'>
                <ChatTop />
            </div>
            <div className='chat-middle'>
                <Messages />
            </div>
            <div className='chat-bottom'>
                <ChatBottom />
            </div>


        </CurrentRoomProvider>
    )
}

export default Chat