import React from 'react'
import './style.scss'

import Logo from '../../images/blaze-punch.png'

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Col,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'

//

const AppNavbar = () => {
  return (
    <Navbar className='navbar__container'>
      <Container fluid>
        <Col>
          <Navbar.Brand className='mr-5 navbar-brand' href='#home'>
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
              <Nav.Link href='#events' className='navbar__active-link'>
                <i class='fas fa-calendar-week fa-2x' />
                {true && <div className='active-link__bottom'></div>}
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Col>

        <Col>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-2' />
            <Button variant='outline-primary'>Search</Button>
          </Form>
        </Col>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
