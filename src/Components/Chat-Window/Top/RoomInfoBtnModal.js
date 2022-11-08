import React from 'react'
import { Modal, Button } from 'rsuite'
import { useCurrentRoom } from '../../../context/current-room.context'
import { useModalState } from '../../../misc/custom-hooks'


function RoomInfoBtnModal() {
    const { IsOpen, open, close } = useModalState()
    const description = useCurrentRoom(v => v.description)
    const name = useCurrentRoom(v => v.name)
    return (
        <>
            <Button appearance="link" className="px-0" onClick={open} >
                Room Information
            </Button>
            <Modal show={IsOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>About {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="mb-1">Desciption</h6>
                    <p>{description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default RoomInfoBtnModal