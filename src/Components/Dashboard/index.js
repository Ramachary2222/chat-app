import React from 'react'
import { Drawer, Button } from 'rsuite';
import { useProfile } from '../../context/profile.context';

function Dashboard({ OnSignOut }) {
    const { profile } = useProfile()
    return (
        <>
            <Drawer.Header>
                Dashboard
            </Drawer.Header>
            <Drawer.Body>
                <h3>Hey , {profile.name}</h3>
            </Drawer.Body>
            <Drawer.Footer>
                <Button block color='red' onClick={OnSignOut}> Sign Out</Button>
            </Drawer.Footer>


        </>
    )
}

export default Dashboard