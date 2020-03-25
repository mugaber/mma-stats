import React, { useState } from 'react'
import './style.scss'

import { Form, Button } from 'react-bootstrap'

import axios from 'axios'

//

const initFormErrors = {
  name: { state: false, text: '' },
  email: { state: false, text: '' },
  password1: { state: false, text: '' },
  password2: { state: false, text: '' }
}

//

const SignupForm = () => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  })

  const { name, email, password1, password2 } = formInputs

  const [formErrors, setFormErrors] = useState(initFormErrors)

  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = e => {
    setFormErrors(initFormErrors)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const emailRe = /^(\w){2,20}@(\w){2,10}\.(\w){2,10}$/gi
    const nameRe = /^(\w){2,10}[\ ]?(\w){2,10}?$/gi

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

    const isPasswordValid = password1.length >= 8
    if (!isPasswordValid)
      setFormErrors({
        ...formErrors,
        password1: {
          state: true,
          text: 'Password can not be less than 8 charachters long'
        }
      })

    const isPasswordsMatch = password1 === password2
    if (!isPasswordsMatch)
      setFormErrors({
        ...formErrors,
        password2: { state: true, text: 'Passwords do not match' }
      })

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isPasswordsMatch) return

    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify({ name, email, password: password1 })

    try {
      const res = await axios.post('http://localhost:5000/api/users', body, config)
      console.log(res, res.data)
    } catch (error) {
      console.error('signup error', error.response.data)
    }
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
          name='password1'
          value={password1}
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

export default SignupForm
