import React from 'react'
import './style.scss'

import { Container, Row, Col } from 'react-bootstrap'

import Logo from '../../images/logo.png'

const Footer = () => {
  return (
    <footer>
      <Container fluid className='footer__container'>
        <Row>
          <Col>
            <img src={Logo} alt='logo' style={{ height: '33px' }} />
            MMA Stats
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
