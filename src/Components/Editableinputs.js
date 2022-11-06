/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import { Input, InputGroup, Icon, Button, Alert } from 'rsuite';

function Editableinputs({ InitialValue,
    onSave,
    label = null,
    placeholder = "Write your value",
    emptyMsg = "Input is Empty",
    ...inputProps }) {

    const [input, setinput] = useState(InitialValue);
    const [isEditable, setisEditable] = useState(false);
    const OnInputChange = useCallback((value) => {
        setinput(value);
    }, [])

    const onEditClick = useCallback(() => {
        setisEditable(p => !p);
        setinput(InitialValue);
    }, [InitialValue])

    const onSaveClick = async () => {
        const trimmed = input.trim();

        if (trimmed === '') {
            Alert.info(emptyMsg, 4000);
        }
        if (trimmed !== InitialValue) {
            await onSave(trimmed)
        }

        setisEditable(false);
    }

    return (
        <div>

            {label}
            <InputGroup>
                <Input {...inputProps} disabled={!isEditable} placeholder={placeholder} value={input} onChange={OnInputChange} />
                <Button onClick={onEditClick}>
                    <Icon icon={isEditable ? 'close' : 'edit2'} />
                </Button>
                {isEditable &&
                    <Button onClick={onSaveClick}>
                        <Icon icon="check" />
                    </Button>
                }
            </InputGroup>
        </div>
    )
}

export default Editableinputs