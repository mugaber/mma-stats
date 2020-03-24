import React from 'react'
import './style.scss'

import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container fluid className='footer__container'>
        <Row>
          <Col>MMA</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
