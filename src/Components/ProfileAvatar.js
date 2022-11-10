import React from 'react'
import { Avatar } from 'rsuite'
import { getNameinitials } from '../helpers'

function ProfileAvatar({ name, ...avatarProps }) {
    return (
        <Avatar{...avatarProps}>
            {getNameinitials(name)}
        </Avatar>
    )
}

export default ProfileAvatar