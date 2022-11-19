import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from 'rsuite'
import MessageItem from './MessageItem'
import { auth, database } from '../../../misc/firebase'
import { transformToArrWithId } from '../../../helpers'


function Messages() {


    const { chatId } = useParams()
    const [messages, setMessages] = useState(null)
    const isChatEmpty = messages && messages.length === 0
    const canShowMessages = messages && messages.length > 0


    useEffect(() => {
        const messagesRef = database.ref('/messages')


        messagesRef.orderByChild('roomId').equalTo(chatId).on('value', snap => {
            const data = transformToArrWithId(snap.val())
            setMessages(data)
        })
        return () => {
            messagesRef.off('value')
        }



    }, [chatId])

    const handleAdmin = useCallback(async (uid) => {
        const adminRef = database.ref(`/rooms/${chatId}/admins`);

        let alertMsg;

        await adminRef.transaction((admins) => {

            if (admins) {
                if (admins[uid]) {
                    admins[uid] = null;
                    alertMsg = 'Admin Access Removed';
                }
                else {
                    admins[uid] = true;
                    alertMsg = 'Admin Access Granted';
                }
            }
            return admins;
        })

        Alert.info(alertMsg, 4000);

    }, [chatId]);

    const handleLike = useCallback(async (msgId) => {

        const { uid } = auth.currentUser;
        const MessageRef = database.ref(`/messages/${msgId}`);

        let alertMsg;

        await MessageRef.transaction((msgg) => {

            if (msgg) {
                if (msgg.Likes && msgg.Likes[uid]) {
                    msgg.LikeCount -= 1;
                    msgg.Likes[uid] = null;
                    alertMsg = 'Like Removed';
                }
                else {
                    msgg.LikeCount += 1;
                    if (!msgg.Likes) {
                        msgg.Likes = {}
                    }
                    msgg.Likes[uid] = true;
                    alertMsg = 'Liked the message';
                }
            }
            return msgg;
        })

        Alert.info(alertMsg, 4000);

    }, [])

    const handleDelete = useCallback(
        async (msgId) => {
            // eslint-disable-next-line no-alert
            if (!window.confirm("Delete this message?")) {
                return;
            }

            const isLast = messages[messages.length - 1].id === msgId;

            const updates = {};

            updates[`/messages/${msgId}`] = null;

            if (isLast && messages.length > 1) {
                updates[`/rooms/${chatId}/LastMessage`] = {
                    ...messages[messages.length - 2],
                    msgId: messages[messages.length - 2].id,
                };
            }

            if (isLast && messages.length === 1) {
                updates[`/rooms/${chatId}/LastMessage`] = null;
            }

            try {
                await database.ref().update(updates);
                Alert.info("Message has been deleted", 4000);
            } catch (error) {
                Alert.error(error.message, 4000);
            }
        },
        [chatId, messages]
    );



    return (
        <ul className='msg-list custom-scroll' >
            {isChatEmpty && <li>No messages yet</li>}
            {canShowMessages && messages.map(msg => <MessageItem key={msg.id}
                message={msg}
                handleAdmin={handleAdmin}
                handleLike={handleLike}
                handleDelete={handleDelete} />)}
        </ul>
    )
}


export default Messages


