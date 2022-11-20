import React, { useCallback, useState } from 'react'
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { Alert, Icon, InputGroup } from 'rsuite'
import { storage } from '../../../misc/firebase';

function AudioMsgBtn({ afterUpload }) {
    const { chatId } = useParams();
    const [isRecording, setisRecording] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

    const onClick = useCallback(() => {
        setisRecording(p => !p)
    }, [])

    const onUpload = useCallback(async (data) => {

        setIsUploading(true);
        try {
            const snap = await storage
                .ref(`/chat/${chatId}`)
                .child(`audio_${Date.now()}.mp3`)
                .put(data.blob, { cacheControl: `public,max-age=${3600 * 24 * 3}` });

            const file = {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                url: await snap.ref.getDownloadURL()
            }

            afterUpload([file]);
            setIsUploading(false);

        } catch (error) {
            setIsUploading(false);
            Alert.error(error.message);
        }
    }, [afterUpload, chatId]);

    return (
        <div>  <InputGroup.Button onClick={onClick}
            disabled={isUploading}
            className={isRecording ? 'animate-blink' : ''}>
            <Icon icon="microphone" />
            <ReactMic
                record={isRecording}
                className="d-none"
                onStop={onUpload}
            />
        </InputGroup.Button></div>
    )
}

export default AudioMsgBtn