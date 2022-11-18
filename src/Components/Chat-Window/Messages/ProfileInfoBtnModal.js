import React from 'react'
import { Button, Modal } from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';

function ProfileInfoBtnModal({ profile, children, ...btnProps }) {

    const { IsOpen, open, close } = useModalState()

    const { name, CreatedAt, avatar } = profile;
    const memberSince = new Date(CreatedAt).toLocaleDateString();
    const shortName = profile.name.split(' ')[0];

    return (
        <div>
            <Button {...btnProps} onClick={open} appearance="link" className="p-0 ml-1 text-black">
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
                    {children}
                    <Button block onClick={close} color="blue">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileInfoBtnModal