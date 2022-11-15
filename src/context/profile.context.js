/* eslint-disable no-shadow */
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};



const ProfileContext = createContext();

export function ProfileProvider({ children }) {

    const [profile, setprofile] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        let userRef;
        let userStatusRef;
        const authUnSub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userStatusRef = database.ref(`/status/${authObj.uid}`);
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value', (snap) => {
                    const { name, CreatedAt, avatar } = snap.val();

                    const data = {
                        name,
                        CreatedAt,
                        avatar,
                        uid: authObj.uid,
                        email: authObj.email
                    }
                    setprofile(data);
                    setisLoading(false);

                });

                database.ref('.info/connected').on('value', (snapshot) => {
                    if (!!snapshot.val() === false) {
                        return;
                    };
                    userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        userStatusRef.set(isOnlineForDatabase);
                    });
                });


            } else {
                if (userRef) {
                    userRef.off();
                }
                if (userStatusRef) {
                    userStatusRef.off();
                }
                database.ref('.info/connected').off();
                setprofile(null);
                setisLoading(false);
            }

        });

        return () => {
            authUnSub();

            if (userRef) {

                userRef.off();
            }

            if (userStatusRef) {
                userStatusRef.off();
            }
            database.ref('.info/connected').off();
        }

    }, [])

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return (<ProfileContext.Provider value={{ isLoading, profile }}>
        {children}
    </ProfileContext.Provider>);
}

export const useProfile = () => useContext(ProfileContext);