/* eslint-disable react/jsx-no-useless-fragment */
import React, { useCallback } from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';


function DashboardToggle() {

    const { IsOpen, open, close } = useModalState()
    const isMobile = useMediaQuery('(max - width: 992px)');

    const OnSignOut = useCallback(() => {
        database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() => {
            auth.signOut();
            Alert.info('Signed Out')
            close();
        }).catch(error => {
            Alert.error(error.message, 4000);
        })

    }, [close])

    return (
        <>
            <Button block color='blue' onClick={open}>
                <Icon icon="dashboard" /> Dashboard
            </Button>
            <Drawer full={isMobile} show={IsOpen} onHide={close} placement='left'>
                <Dashboard OnSignOut={OnSignOut} />
            </Drawer>
        </>
    )
}

export default DashboardToggle