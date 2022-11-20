/* eslint-disable no-unused-vars */
import React from 'react'
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { getUserUpdates } from '../../helpers';
import { database } from '../../misc/firebase';
import Editableinputs from '../Editableinputs';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProvideBlock from './ProvideBlock';

function Dashboard({ OnSignOut }) {
    const { profile } = useProfile();
    const onSave = async (newdata) => {
        try {
            const updates = await getUserUpdates(profile.uid, 'name', newdata, database);
            await database.ref().update(updates);
            Alert.success('Nickname has been updated', 4000)
        } catch (error) {
            Alert.error(error.message, 4000);
        }
    }
    return (
        <div className='overflow-x-scroll'>
            <Drawer.Header>
                Dashboard
            </Drawer.Header>
            <Drawer.Body>
                <h3>Hey , {profile.name}</h3>
                <ProvideBlock />
                <Divider />
                <Editableinputs
                    name="Nickname"
                    InitialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className='mb-2'>Nickname</h6>}

                />
                <AvatarUploadBtn />
            </Drawer.Body>
            <Drawer.Footer>
                <Button block color='red' onClick={OnSignOut}> Sign Out</Button>
            </Drawer.Footer>


        </div>
    )
}

export default Dashboard