import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { Grid, Row, Col } from 'rsuite'
import Sidebar from '../../Components/Sidebar'
import { RoomsProvider } from '../../context/rooms.context'
import { useMediaQuery } from '../../misc/custom-hooks'
import Chat from './Chat'

function Home() {

    const isdesktop = useMediaQuery('(min-width: 992px)');

    const { isExact } = useRouteMatch();

    const canRenderSidebar = isdesktop || isExact;

    return (
        <RoomsProvider>
            <Grid fluid className='h-100'>
                <Row className='h-100'>
                    {canRenderSidebar &&
                        <Col xs={24} md={8} className='h-100'>
                            <Sidebar />
                        </Col>}


                    <Switch>
                        <Route exact path="/chat/:chatId">
                            <Col xs={24} md={16} className="h-100">
                                <Chat />
                            </Col>
                        </Route>
                        <Route>
                            {isdesktop &&
                                <Col xs={24} md={16} className="h-100">
                                    <h5 className="text-center mt-page">Please Select Chat</h5>
                                </Col>
                            }
                        </Route>
                    </Switch>

                </Row>
            </Grid>
        </RoomsProvider>
    )
}

export default Home