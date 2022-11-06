import React, { useState } from 'react';
import { Modal, Button, Alert } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hooks';

const fileInputTypes = '.png .jpeg, .jpg';
const acceptedFileType = ['image/png', 'image/jpeg', 'image/jpg'];
const isValidFile = (file) => acceptedFileType.includes(file.type);
function AvatarUploadBtn() {
    const { IsOpen, open, close } = useModalState();
    const [img, setImg] = useState(null);
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
    return (
        <div className="mt-3 text-center">
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
                        <Button color='green' block appearance="ghost">
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}


export default AvatarUploadBtn;