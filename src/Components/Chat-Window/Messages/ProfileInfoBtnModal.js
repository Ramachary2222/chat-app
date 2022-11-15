import React from 'react'
import { Button, Modal } from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';

function ProfileInfoBtnModal({ profile }) {

    const { IsOpen, open, close } = useModalState()

    const { name, avatar, CreatedAt } = profile;
    const memberSince = new Date(CreatedAt).toLocaleDateString();
    const shortName = profile.name.split(' ')[0];

    return (
        <div>
            <Button onClick={open}>
                {shortName}
            </Button>
            <Modal show={IsOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        {shortName} profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <ProfileAvatar
                        circle src={avatar}
                        name={name}
                        className="width-200 height-200 img-fullsize font-huge" />
                    <h4 className='mt-2'>{name}</h4>
                    <p>member Since {memberSince}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileInfoBtnModal