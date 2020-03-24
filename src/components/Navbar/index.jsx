import React from 'react'

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

const NavbarComp = () => {
  return (
    <Navbar bg='primary' variant='dark' className='navbar__container'>
      <Navbar.Brand href='#home'>MMA</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#events'>Events</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-light'>Search</Button>
      </Form>
    </Navbar>
  )
}

export default NavbarComp
