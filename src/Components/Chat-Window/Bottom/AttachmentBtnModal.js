import React, { useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks'
import { storage } from '../../../misc/firebase';

function AttachmentBtnModal({ afterUpload }) {
    const { chatId } = useParams();
    const MAX_FILE_SIZE = 1000 * 1024 * 5;
    const { IsOpen, open, close } = useModalState();
    const [fileList, setfileList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const onChange = (fileArr) => {
        const filtered = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0, 5);

        setfileList(filtered);
    }

    const onUpload = async () => {
        try {
            const uploadPromises = fileList.map(f => {
                return storage
                    .ref(`/chat/${chatId}`)
                    .child(Date.now() + f.name)
                    .put(f.blobFile, { cacheControl: `public,max-age=${3600 * 24 * 3}` });
            });

            const UploadSnapshots = await Promise.all(uploadPromises);

            const sharpPromises = UploadSnapshots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL()
                }
            })

            const files = await Promise.all(sharpPromises);

            await afterUpload(files);

            setisLoading(false);

            close();

        } catch (error) {
            setisLoading(false);
            Alert.error(error.message);
        }
    }

    return (
        <div>
            <InputGroup.Button onClick={open}>
                <Icon icon="attachment" />
            </InputGroup.Button>
            <Modal show={IsOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        Upload File
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Uploader
                        autoUpload={false}
                        action=""
                        fileList={fileList}
                        onChange={onChange}
                        multiple
                        listType="picture-text"
                        className='w-100'
                        disabled={isLoading}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button block onClick={onUpload} disabled={isLoading}>
                        Send to Chat
                    </Button>
                    <div>
                        <small className='text-right mt-2'>
                            *only files less than 5 mb are allowed
                        </small>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default AttachmentBtnModal