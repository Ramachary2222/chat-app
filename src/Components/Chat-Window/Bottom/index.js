import React, { useState, useCallback } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

function assembledMsg(profile, chatId) {
    return {
        roomId: chatId,
        author: {
            name: profile.name,
            uid: profile.uid,
            CreatedAt: profile.CreatedAt,
            ...(profile.avatar ? { avatar: profile.avatar } : {})
        },
        CreatedAt: firebase.database.ServerValue.TIMESTAMP,
    }
}

function ChatBottom() {

    const [input, setInput] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const { chatId } = useParams();
    const { profile } = useProfile();

    const onInputChange = useCallback((value) => {
        setInput(value);
    }, [])

    const onSendClick = async () => {
        if (input.trim() === '') {
            return;
        }

        const msgData = assembledMsg(profile, chatId);
        msgData.text = input;

        const updates = {};

        const messageId = database.ref('messages').push().key;

        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/LastMessage`] = {
            ...msgData,
            msgId: messageId,
        }
        setisLoading(true);
        try {
            await database.ref().update(updates);
            setInput('');
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
            Alert.error(error.message, 10000)
        }

    }
    const OnKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            onSendClick();
        }
    }

    return (
        <div>
            <InputGroup>
                <Input placeholder="Write a new message here ...." value={input} onChange={onInputChange} onKeyDown={OnKeyDown} />
                <InputGroup.Button appearance="primary" color='blue' onClick={onSendClick} disabled={isLoading} >
                    <Icon icon="send" />
                </InputGroup.Button>
            </InputGroup>


        </div>
    )
}

export default ChatBottom