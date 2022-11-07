
export function transformToArrWithId(snapval) {
    return snapval ? Object.keys(snapval).map(
        roomId => {
            return {
                ...snapval[roomId], id: roomId
            };
        }
    ) : []
}