/* eslint-disable no-shadow */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';


const ProfileContext = createContext();

export function ProfileProvider({ children }) {

    const [profile, setprofile] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        let userRef;
        const authUnSub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value', (snap) => {
                    const { name, createdAt } = snap.val();

                    const data = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email
                    }
                    setprofile(data);
                    setisLoading(false);

                });


            } else {
                if (userRef) {
                    userRef.off();
                }
                setprofile(null);
                setisLoading(false);
            }

        });

        return () => {
            authUnSub();

            if (userRef) {

                userRef.off();
            }
        }

    }, [])

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return (<ProfileContext.Provider value={{ isLoading, profile }}>
        {children}
    </ProfileContext.Provider>);
}

export const useProfile = () => useContext(ProfileContext);