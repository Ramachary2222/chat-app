import React, { useState, useCallback } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';

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
        LikeCount: 0,
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

    const afterUpload = useCallback(async (files) => {
        setisLoading(true);

        const updates = {};

        files.forEach(file => {


            const msgData = assembledMsg(profile, chatId);
            msgData.file = file;

            const messageId = database.ref('messages').push().key;

            updates[`/messages/${messageId}`] = msgData;
        });
        const LastMsgId = Object.keys(updates).pop();
        updates[`/rooms/${chatId}/LastMessage`] = {
            ...updates[LastMsgId],
            msgId: LastMsgId,
        }
        try {
            await database.ref().update(updates);
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
            Alert.error(error.message, 10000)
        }



    }, [chatId, profile])
    return (
        <div>
            <InputGroup>
                <AttachmentBtnModal afterUpload={afterUpload} />
                <Input placeholder="Write a new message here ...." value={input} onChange={onInputChange} onKeyDown={OnKeyDown} />
                <InputGroup.Button appearance="primary" color='blue' onClick={onSendClick} disabled={isLoading} >
                    <Icon icon="send" />
                </InputGroup.Button>
            </InputGroup>


        </div>
    )
}

export default ChatBottom