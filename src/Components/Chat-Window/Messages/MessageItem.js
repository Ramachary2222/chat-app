import React, { memo } from 'react'
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import IconBtnControl from './IconBtnControl';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

function MessageItem({ message, handleAdmin, handleLike, Likes, LikeCount, handleDelete }) {

    const { author, createdAt, text } = message;

    const [selfRef, isHovered] = useHover();

    const isMobile = useMediaQuery('(max-width:992px)');

    const isAdmin = useCurrentRoom(v => v.isAdmin);

    const admins = useCurrentRoom(v => v.admins);

    const isMsgAuthorAdmin = admins.includes(author.uid);

    const isAuthor = auth.currentUser.uid === author.uid;

    const canGrantAdmin = isAdmin && !isAuthor;

    const canShowIcon = isMobile || isHovered;

    const isLiked = Likes && Object.keys(Likes).includes(auth.currentUser.uid);


    return (



        <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`} ref={selfRef}>
            <div className="d-flex align-items-center font-bolder mb-1">
                <PresenceDot uid={author.uid} />
                <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />
                <ProfileInfoBtnModal profile={author} className="p-0 ml-1 text-black">
                    {canGrantAdmin &&
                        <Button block onClick={() => handleAdmin(author.uid)} color="green">
                            {isMsgAuthorAdmin ? 'Remove Admin Access' : 'Grant Admin Access'}
                        </Button>
                    }
                </ProfileInfoBtnModal>
                <TimeAgo datetime={createdAt} className="font-normal text-black-45 ml-1" />
                <IconBtnControl
                    {...(isLiked ? { color: 'red' } : {})}
                    isVisible={canShowIcon}
                    iconName="heart"
                    toolTip="Like this message"
                    onClick={() => handleLike(message.id)}
                    badgeContent={LikeCount}
                />
                <IconBtnControl
                    isVisible={canShowIcon}
                    iconName="close"
                    toolTip="Delete this message"
                    onClick={() => handleDelete(message.id)}
                />

            </div>
            <div>
                <span className='word-break-all'>{text}</span>
            </div>

        </li>
    )
}

export default memo(MessageItem)