import React from 'react'
import './style.scss'

import Logo from '../../images/logo.png'

import { Navbar, Nav, Form, FormControl, Button, Container, Col } from 'react-bootstrap'

const NavbarComp = () => {
  return (
    <Navbar className='navbar__container'>
      <Container fluid>
        <Col>
          <Navbar.Brand className='mr-5 navbar-brand' href='#home'>
            <img src={Logo} alt='logo' style={{ height: '50px' }} />
          </Navbar.Brand>
        </Col>

        <Col sm={5}>
          <Nav className='mr-auto navbar-options'>
            <Nav.Link href='#events'>Events</Nav.Link>
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

export default NavbarComp
