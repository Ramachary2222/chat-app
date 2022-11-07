import React, { createContext, useContext, useEffect, useState } from "react";
import { transformToArrWithId } from "../helpers";
import { database } from "../misc/firebase";


const RoomsContext = createContext();

export function RoomsProvider({ children }) {

    const [rooms, setrooms] = useState(null);

    useEffect(() => {
        const roomsListRef = database.ref('rooms');

        roomsListRef.on('value', (snap) => {
            const data = transformToArrWithId(snap.val())
            setrooms(data);
        })

        return () => {
            roomsListRef.off();
        }

    }, [])


    return <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>

}

export const useRooms = () => useContext(RoomsContext);
