/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Button, Icon, Drawer } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';

function DashboardToggle() {

    const { IsOpen, open, close } = useModalState()
    const isMobile = useMediaQuery('(max - width: 992px)');

    return (
        <>
            <Button block color='blue' onClick={open}>
                <Icon icon="dashboard" /> Dashboard
            </Button>
            <Drawer full={isMobile} show={IsOpen} onHide={close} placement='left'>
                <Dashboard />
            </Drawer>
        </>
    )
}

export default DashboardToggle