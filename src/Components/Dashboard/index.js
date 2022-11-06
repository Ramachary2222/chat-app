/* eslint-disable no-unused-vars */
import React from 'react'
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import Editableinputs from '../Editableinputs';

function Dashboard({ OnSignOut }) {
    const { profile } = useProfile();
    const onSave = async (newdata) => {
        const userNicknameRef = database.ref(`/profiles/${profile.uid}`).child('name')

        try {
            await userNicknameRef.set(newdata);
            Alert.success('Nickname has been updated', 4000)
        } catch (error) {
            Alert.error(error.message, 4000);
        }
    }
    return (
        <>
            <Drawer.Header>
                Dashboard
            </Drawer.Header>
            <Drawer.Body>
                <h3>Hey , {profile.name}</h3>
                <Divider />
                <Editableinputs
                    name="Nickname"
                    InitialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className='mb-2'>Nickname</h6>}

                />
            </Drawer.Body>
            <Drawer.Footer>
                <Button block color='red' onClick={OnSignOut}> Sign Out</Button>
            </Drawer.Footer>


        </>
    )
}

export default Dashboard