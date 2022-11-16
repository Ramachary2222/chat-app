
export function transformToArrWithId(snapval) {
    return snapval ? Object.keys(snapval).map(
        roomId => {
            return {
                ...snapval[roomId], id: roomId
            };
        }
    ) : []
}

export function transformToArr(SnapVal) {
    return SnapVal ? Object.keys(SnapVal) : []
}

export function getNameinitials(name) {
    const splitName = name.toUpperCase().split(' ');

    if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0]
    }

    return splitName[0][0]
};

export async function getUserUpdates(userId, keyToUpdate, value, db) {
    const updates = {};


    updates[`/profiles/${userId}/${keyToUpdate}`] = value;


    const getMsgs = db.ref('/messages').orderByChild('author/uid').equalTo(userId).once('value');
    const getRooms = db.ref('/rooms').orderByChild('LastMessage/author/uid').equalTo(userId).once('value');



    const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);
    mSnap.forEach(msgSnap => {
        updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
    });


    rSnap.forEach(roomSnap => {
        updates[`/rooms/${roomSnap.key}/LastMessage/author/${keyToUpdate}`] = value;
    });
    return updates;
};