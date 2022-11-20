/* eslint-disable consistent-return */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Button } from 'rsuite'
import MessageItem from './MessageItem'
import { auth, database, storage } from '../../../misc/firebase'
import { groupBy, transformToArrWithId } from '../../../helpers'

const PAGE_SIZE = 15;

const messagesRef = database.ref('/messages');


function shouldScrollToBottom(node, threshold = 30) {
    const percentage = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;

    return percentage > threshold
}


function Messages() {


    const { chatId } = useParams()
    const [messages, setMessages] = useState(null)
    const [limit, setLimit] = useState(PAGE_SIZE);
    const selfRef = useRef();
    const isChatEmpty = messages && messages.length === 0
    const canShowMessages = messages && messages.length > 0;

    const loadMessages = useCallback((limitToLast) => {
        const node = selfRef.current
        messagesRef.off();

        messagesRef.orderByChild('roomId').limitToLast(limitToLast || PAGE_SIZE).equalTo(chatId).on('value', snap => {
            const data = transformToArrWithId(snap.val());
            setMessages(data)

            if (shouldScrollToBottom(node)) {
                node.scrollTop = node.scrollHeight;
            }
        })

        setLimit(p => p + PAGE_SIZE);
    }, [chatId]);

    const onLoadMore = useCallback(() => {

        const node = selfRef.current;

        const oldHeight = node.scrollHeight;

        loadMessages(limit);

        setTimeout(() => {
            const newHeight = node.scrollHeight;
            node.scrollTop = newHeight - oldHeight;

        }, 400);
    }, [loadMessages, limit])

    useEffect(() => {
        const node = selfRef.current;
        loadMessages();

        setTimeout(() => {
            node.scrollTop = node.scrollHeight;
        }, 400);
        return () => {
            messagesRef.off('value')
        }
    }, [loadMessages])

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
        async (msgId, file) => {
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
                return Alert.error(error.message, 4000);
            }

            if (file) {
                try {
                    const fileRef = storage.refFromURL(file.url);
                    await fileRef.delete();
                } catch (error) {
                    Alert.error(error.message, 4000);
                }
            }

        },
        [chatId, messages]
    );

    const renderMessages = () => {
        const groups = groupBy(messages, (item) => new Date(item.CreatedAt).toDateString());

        const items = [];

        Object.keys(groups).forEach((date) => {
            items.push(<li key={date} className='text-center mb-1 padded'>{date}</li>)

            const msgs = groups[date].map(msg => (
                <MessageItem key={msg.id}
                    message={msg}
                    handleAdmin={handleAdmin}
                    handleLike={handleLike}
                    handleDelete={handleDelete} />)

            )

            items.push(...msgs);

        })


        return items;


    }


    return (
        <ul className='msg-list custom-scroll' ref={selfRef} >
            {messages && messages.length >= PAGE_SIZE && <li className='text-center mb-2 mt-2 padded'>
                <Button color='green' onClick={onLoadMore}>Load More</Button></li>}
            {isChatEmpty && <li>No messages yet</li>}
            {canShowMessages && renderMessages()}
        </ul>
    )
}


export default Messages


