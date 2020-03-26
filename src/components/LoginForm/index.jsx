import React, { useState, useEffect } from 'react'
import './style.scss'

import { connect } from 'react-redux'
import { login } from '../../redux/auth/actions'

import { Form, Button } from 'react-bootstrap'

//

const Login = ({ login, setShowLogin, isAuthenticated }) => {
  useEffect(() => {
    if (isAuthenticated) setShowLogin(false)
  }, [isAuthenticated])

  const [formData, setFormDate] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const handleChange = e => setFormDate({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!email || !password) return alert('email and password are required')

    login(email, password)
  }

  return (
    <Form onSubmit={e => handleSubmit(e)} className='log-in__form'>
      <Form.Group controlId='loginFormEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type='email'
          name='email'
          value={email}
          placeholder='Enter email'
          onChange={e => handleChange(e)}
        />
      </Form.Group>

      <Form.Group controlId='loginFormPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          minLength='8'
          type='password'
          name='password'
          value={password}
          placeholder='Enter Password'
          onChange={e => handleChange(e)}
        />
      </Form.Group>

      <Form.Group>
        <Button variant='primary' type='submit' className='log-in__submit'>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
