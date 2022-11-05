import React from 'react'
import { Grid, Row, Col } from 'rsuite'
import Sidebar from '../Components/Sidebar'

function Home() {
    return (
        <Grid>
            <Row>
                <Col xs={24} md={8}>
                    <Sidebar />
                </Col>
            </Row>
        </Grid>
    )
}

export default Home