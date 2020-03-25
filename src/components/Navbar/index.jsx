import React, { useState, useEffect } from 'react'
import './style.scss'

import { withRouter } from 'react-router-dom'

import SignupForm from '../SignupForm'
import Logo from '../../images/blaze-punch.png'

import {
  Navbar,
  Nav,
  Button,
  Container,
  Col,
  Tooltip,
  OverlayTrigger,
  Modal
} from 'react-bootstrap'

//

const AppNavbar = ({ history }) => {
  const [activePage, setActivePage] = useState('')

  useEffect(() => {
    setActivePage(history.location.pathname.slice(1))
  }, [history.location])

  const [showSignup, setShowSignup] = useState(false)

  return (
    <Navbar className='navbar__container'>
      <Container fluid>
        <Col>
          <Navbar.Brand className='mr-5 navbar-brand' onClick={() => history.push('/')}>
            <img src={Logo} alt='logo' style={{ height: '50px' }} />
          </Navbar.Brand>
        </Col>

        <Col sm={5}>
          <Nav className='navbar-options'>
            <OverlayTrigger
              key='bottom'
              placement='bottom'
              overlay={
                <Tooltip id='tooltip-bottom'>
                  <strong>Events</strong>
                </Tooltip>
              }
            >
              <Nav.Link
                onClick={() => history.push('/events')}
                className={activePage === 'events' && 'navbar__active-link'}
              >
                <i className='fas fa-calendar-week fa-2x' />
                {activePage === 'events' && <div className='active-link__bottom'></div>}
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Col>

        <Col className='sign-buttons__container'>
          <Button variant='outline-success'>Log In</Button>

          <Button variant='outline-primary' onClick={() => setShowSignup(true)}>
            Sign Up
          </Button>
        </Col>

        <Modal
          centered
          show={showSignup}
          aria-labelledby='contained-modal-title-vcenter'
          onHide={() => setShowSignup(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <SignupForm />
          </Modal.Body>
        </Modal>
      </Container>
    </Navbar>
  )
}

export default withRouter(AppNavbar)
