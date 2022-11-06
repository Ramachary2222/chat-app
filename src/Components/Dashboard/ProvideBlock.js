import React, { useState } from 'react'
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/firebase'

function ProvideBlock() {

    const [isConnected, setisConnected] = useState({
        'google.com': auth.currentUser.providerData.some((data) => data.providerId === 'google.com'),
        'facebook.com': auth.currentUser.providerData.some((data) => data.providerId === 'facebook.com'),
    })
    const updateisConnected = (providerId, value) => {
        setisConnected(p => {
            return ({
                ...p,
                [providerId]: value,
            });
        }
        );
    };
    const unlink = (providerId) => {
        try {
            if (auth.currentUser.providerData.length === 1) {
                throw new Error(`You cannot disconnect from ${providerId}`)
            }

            auth.currentUser.unlink(providerId);
            updateisConnected(providerId, false);
            Alert.info(`Disconnected from ${providerId}`);
        } catch (error) {
            Alert.error(error.message, 4000)
        }
    }
    const unlinkFacebook = () => {
        unlink('facebook.com')
    }
    const unlinkGoogle = () => {
        unlink('google.com')
    }
    const link = async (provider) => {
        try {
            await auth.currentUser.linkWithPopup(provider);
            Alert.info(`Linked to ${provider.providerId}`, 4000);
            updateisConnected(provider.providerId, true);
        } catch (error) {
            Alert.error(error.message);
        }
    }
    const linkFacebook = () => {
        link(new firebase.auth.FacebookAuthProvider())
    }
    const linkGoogle = () => {
        link(new firebase.auth.GoogleAuthProvider())
    }



    return (
        <div>
            <div className='mt-2'>
                {isConnected['google.com'] &&
                    <Tag color='green' closable onClose={unlinkGoogle}>
                        <Icon icon='google' /> Connected
                    </Tag>
                }
                {isConnected['facebook.com'] &&
                    <Tag color='blue' closable onClose={unlinkFacebook}>
                        <Icon icon='facebook' /> Connected
                    </Tag>}
            </div>
            <div className='mt-3'>
                {!isConnected['google.com'] &&
                    <Button block color="green" onClick={linkFacebook}>
                        <Icon icon="google" /> Link to Google
                    </Button>
                }
                {!isConnected['facebook.com'] &&
                    <Button block color="blue" onClick={linkGoogle}>
                        <Icon icon="facebook" /> Link to facebook
                    </Button>
                }


            </div>
        </div>
    )
}

export default ProvideBlock