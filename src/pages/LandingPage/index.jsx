import React from 'react'
import './style.scss'

import { Container, Col } from 'react-bootstrap'

const LandingPage = () => {
  return (
    <div className='landing-page__container'>
      <div className='landing-page__first-section'>
        <Container fluid className='text-container'>
          <Col>
            <h1 className='landing-page__header'>MMA Stats</h1>
          </Col>

          <Col>
            <p>Your home for all the info about MMA and valuable insights</p>
          </Col>
        </Container>
      </div>
    </div>
  )
}

export default LandingPage
