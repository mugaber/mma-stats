import React, { useState } from 'react'
import './style.scss'

import { Form, Button } from 'react-bootstrap'

import { connect } from 'react-redux'
import { register } from '../../redux/auth/actions'

//

const initFormErrors = {
  name: { state: false, text: '' },
  email: { state: false, text: '' },
  password: { state: false, text: '' },
  password2: { state: false, text: '' }
}

//

const SignupForm = ({ register }) => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formInputs

  const [formErrors, setFormErrors] = useState(initFormErrors)

  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = e => {
    setFormErrors(initFormErrors)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const emailRe = /^(\w){2,20}@(\w){2,10}\.(\w){2,10}$/gi
    const nameRe = /^(\w){2,10}(\ )?(\w){2,10}?$/gi

    const isNameValid = nameRe.test(name)
    if (!isNameValid)
      setFormErrors({
        ...formErrors,
        name: {
          state: true,
          text: 'Username can only contain letters, numbers and _'
        }
      })

    const isEmailValid = emailRe.test(email)
    if (!isEmailValid)
      setFormErrors({
        ...formErrors,
        email: { state: true, text: 'Invalid email address' }
      })

    const isPasswordValid = password.length >= 8
    if (!isPasswordValid)
      setFormErrors({
        ...formErrors,
        password: {
          state: true,
          text: 'Password can not be less than 8 charachters long'
        }
      })

    const isPasswordsMatch = password === password2
    if (!isPasswordsMatch)
      setFormErrors({
        ...formErrors,
        password2: { state: true, text: 'Passwords do not match' }
      })

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isPasswordsMatch)
      return alert('invalid form inputs')

    register({ name, email, password })

    // TO-DO : alert user
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>User name</Form.Label>
        <Form.Control
          required
          type='text'
          name='name'
          value={name}
          onChange={handleInputChange}
          placeholder='Enter your name'
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type='email'
          name='email'
          value={email}
          onChange={handleInputChange}
          placeholder='Enter email'
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type='password'
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder='Password'
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          required
          name='password2'
          value={password2}
          onChange={handleInputChange}
          placeholder='Confirm your password'
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default connect(null, { register })(SignupForm)
