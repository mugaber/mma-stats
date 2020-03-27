import React, { useState, useEffect } from 'react'
import './style.scss'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth/actions'

import LoginForm from '../LoginForm'
import Logo from '../../images/blaze-punch.png'

import {
  Navbar,
  Nav,
  Button,
  Container,
  Col,
  Tooltip,
  OverlayTrigger,
  Modal,
  Image,
  Dropdown
} from 'react-bootstrap'

//

const AppNavbar = ({ history, user, isAuthenticated, logout }) => {
  const [activePage, setActivePage] = useState('')

  useEffect(() => {
    setActivePage(history.location.pathname.slice(1))
  }, [history.location])

  const [showLogin, setShowLogin] = useState(false)

  return (
    <Navbar className='navbar__container'>
      <Container fluid>
        <Col>
          <Navbar.Brand className='mr-5 navbar-brand' onClick={() => history.push('/')}>
            <img src={Logo} alt='logo' style={{ height: '50px' }} />
          </Navbar.Brand>
        </Col>

        {/* Page Navigation */}

        <Col sm={5}>
          <Nav className='navbar-options'>
            {/* Events */}

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

        {/* Controls */}

        <Col className='sign-buttons__container'>
          {!isAuthenticated ? (
            <>
              <Button variant='outline-success' onClick={() => setShowLogin(true)}>
                Log In
              </Button>

              <Button variant='outline-primary' onClick={() => history.push('/signup')}>
                Sign Up
              </Button>
            </>
          ) : (
            <Dropdown id='navbar-dropdown' drop='left'>
              <Dropdown.Toggle variant='primary' id='user-dropdown'>
                <Image src={user.avatar} roundedCircle /> {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Button
                  variant='outline-danger'
                  onClick={() => logout()}
                  style={{ position: 'relative', left: '2rem' }}
                >
                  Log Out
                </Button>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>

        {/* Login Modal */}

        <Modal
          centered
          show={showLogin}
          aria-labelledby='contained-modal-title-vcenter'
          onHide={() => setShowLogin(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <LoginForm setShowLogin={setShowLogin} />
          </Modal.Body>
        </Modal>
      </Container>
    </Navbar>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, { logout })(AppNavbar))
