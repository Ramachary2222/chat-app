import React, { useCallback, useRef, useState } from 'react'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite'
import firebase from 'firebase';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';


const { StringType } = Schema.Types;

const Model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description: StringType().isRequired('Description is required'),
});

const INITIAL_FORM = {
    name: '',
    description: '',
};

function CreateRoomBtnModal() {

    const { IsOpen, open, close } = useModalState();

    const [formValue, setFormValue] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef();

    const onFormChange = useCallback(value => {
        setFormValue(value);
    }, []);

    const onSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }

        setIsLoading(true);

        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
        };

        try {
            await database.ref('rooms').push(newRoomData);

            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            close();
            Alert.info(`${formValue.name} has been created`, 4000);
        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 4000);
        }
    };


    return (
        <div className='mt-1'>

            <Button color="green" onClick={open}>
                <Icon icon="creative" /> Create New Chat Room
            </Button>

            <Modal show={IsOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>Create new chat room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid onChange={onFormChange}
                        formValue={formValue}
                        model={Model}
                        ref={formRef}>
                        <FormGroup>
                            <ControlLabel>Room name</ControlLabel>
                            <FormControl name="name" placeholder="Enter chat room name..." />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                name="description"
                                componentClass="textarea"
                                rows={5}
                                placeholder="Enter room description..."
                            />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance="primary" color='green' onClick={onSubmit} disabled={isLoading}>
                        Create New Chat Room
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default CreateRoomBtnModal