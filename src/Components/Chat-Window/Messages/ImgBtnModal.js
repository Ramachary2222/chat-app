import React from 'react'
import { Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks'

function ImgBtnModal({ src, filename }) {

    const { IsOpen, open, close } = useModalState();
    return (
        <>
            <input type="image" src={src} alt="file" onClick={open} className="height-200 width-300" />
            <Modal show={IsOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        {filename}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img src={src} height="100%" width="100%" alt="file" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <a href={src} target="_blank" rel="noopener noreferrer">View Original</a>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ImgBtnModal