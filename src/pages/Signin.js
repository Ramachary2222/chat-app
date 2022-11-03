import React from 'react';
import firebase from 'firebase/app'
import { Container, Grid, Row, Col, Panel, Button, Icon, Alert } from 'rsuite'
import { auth, database } from '../misc/firebase';

function Signin() {
    const SigninwithProvider = async (provider) => {

        try {
            const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

            if (additionalUserInfo.isNewUser) {
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    CreatedAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
            Alert.success('Signed in Succesfully', 4000)
        } catch (error) {
            Alert.error(error.message, 4000)
        }

    }
    const onSigninwithFacebook = () => {
        SigninwithProvider(new firebase.auth.FacebookAuthProvider())

    }
    const onSigninwithGoogle = () => {
        SigninwithProvider(new firebase.auth.GoogleAuthProvider())
    }



    return (
        <Container>
            <Grid className='mt-page'>
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className='text-center'>
                                <h2>Welcome to Chat App</h2>
                                <p>Progressive Chat Platform for neophytes</p>
                            </div>
                            <div className='mt-3'>
                                <Button block color='blue' onClick={onSigninwithFacebook}>
                                    <Icon icon='facebook' /> Sign in with Facebook
                                </Button>

                                <Button block color='green' onClick={onSigninwithGoogle}>
                                    <Icon icon='google' /> Sign in with Google
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
}

export default Signin