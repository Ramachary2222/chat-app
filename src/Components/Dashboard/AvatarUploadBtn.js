import React, { useState, useRef } from 'react';
import { Modal, Button, Alert } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hooks';
import { useProfile } from '../../context/profile.context'
import { database, storage } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../helpers';

const fileInputTypes = '.png .jpeg, .jpg';
const acceptedFileType = ['image/png', 'image/jpeg', 'image/jpg'];
const isValidFile = (file) => acceptedFileType.includes(file.type);

const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('File Process Error'));
            }
        })
    })
}


function AvatarUploadBtn() {
    const { IsOpen, open, close } = useModalState();
    const { profile } = useProfile();
    const [img, setImg] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const AvatarEditorRef = useRef();

    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files;
        if (currFiles.length === 1) {
            const file = currFiles[0];
            if (isValidFile(file)) {
                setImg(file);
                open();
            }
            else {
                Alert.warning(`Wrong file type ${file.type}`, 4000)
            }
        }
    }
    const OnUploadClick = async () => {
        const canvas = AvatarEditorRef.current.getImageScaledToCanvas();
        setisLoading(true);
        try {

            const blob = await getBlob(canvas);

            const avatarFileRef = storage.ref(`/profiles/${profile.uid}`).child('avatar');

            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public,max-age=${3600 * 24 * 3}`
            })

            const downloadURL = await uploadAvatarResult.ref.getDownloadURL();

            const updates = await getUserUpdates(profile.uid, 'avatar', downloadURL, database);

            await database.ref().update(updates);
            setisLoading(false);
            Alert.info("Avatar has been uplaoded Successfully", 4000)
        } catch (error) {

            setisLoading(false);
            Alert.error(error.message, 4000);
        }
    }
    return (

        <div className="mt-3 text-center">
            <ProfileAvatar circle src={profile.avatar} name={profile.name} className="width-200 height-200 img-fullsize font-huge" />
            <div>
                <label
                    htmlFor="avatar-upload"
                    className="d-block cursor-pointer padded"
                >
                    Select new photo
                    <input
                        id="avatar-upload"
                        type="file"
                        className="d-none"
                        accept={fileInputTypes}
                        onChange={onFileInputChange}
                    />
                </label>
                <Modal show={IsOpen} onHide={close}>
                    <Modal.Header>
                        <Modal.Title>Adjust and Upload new photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            {img &&
                                <AvatarEditor
                                    ref={AvatarEditorRef}
                                    image={img}
                                    width={200}
                                    height={200}
                                    border={10}
                                    borderRadius={100}
                                    rotate={0}
                                />}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color='green' block appearance="ghost" onClick={OnUploadClick} disabled={isLoading}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}


export default AvatarUploadBtn;