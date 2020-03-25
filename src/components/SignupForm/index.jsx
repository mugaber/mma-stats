import React, { useState } from 'react'

import axios from 'axios'

import { Form, Col, Button } from 'react-bootstrap'

//

const initFormResults = {
  name: { show: false, text: '' },
  email: { show: false, text: '' },
  password1: { show: false, text: '' },
  password2: { show: false, text: '' }
}

//

const SignupForm = () => {
  const [validateForm, setValidateForm] = useState(false)

  const [formData, setFormDate] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  })

  const { name, email, password1, password2 } = formData

  const [formErrors, setFormErrors] = useState(initFormResults)

  const handleInputChange = e => {
    setFormDate({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: { show: false } })
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
          show: true,
          text:
            'Username can only contain letters, numbers and _ , at least 2 charachters'
        }
      })

    const isEmailValid = emailRe.test(email)
    if (!isEmailValid)
      setFormErrors({
        ...formErrors,
        email: { show: true, text: 'Invalid email address' }
      })

    const isPasswordValid = password1.length >= 8
    if (!isPasswordValid)
      setFormErrors({
        ...formErrors,
        password1: {
          show: true,
          text: 'Password can not be less than 6 charachters'
        }
      })

    const isPasswordsMatch = password1 === password2
    if (!isPasswordsMatch)
      setFormErrors({
        ...formErrors,
        password2: { show: true, text: 'Passwords do not match' }
      })

    setValidateForm(true)

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isPasswordsMatch) return

    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify({ name, email, password1 })

    try {
      const res = await axios.post('http://localhost:5000/api/users', body, config)
      console.log(res.data)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <Form noValidate validated={validateForm} onSubmit={handleSubmit}>
      <Form.Group as={Col} xs='12' controlId='user-name'>
        <Form.Label>Name</Form.Label>

        <Form.Control
          required
          type='text'
          name='name'
          value={name}
          placeholder='Name'
          onChange={handleInputChange}
        />

        {formErrors.name.show && formErrors.name.text.length && (
          <Form.Control.Feedback type='invalid'>
            Please provide a valid Name
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group as={Col} xs='12' controlId='user-email'>
        <Form.Label>Email</Form.Label>

        <Form.Control
          required
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={handleInputChange}
        />

        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>
          Please provide a valid Email
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} xs='12' controlId='user-password-1'>
        <Form.Label>Password</Form.Label>

        <Form.Control
          required
          type='password'
          name='password1'
          value={password1}
          placeholder='Password'
          onChange={handleInputChange}
        />

        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>
          Please provide a valid Password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} xs='12' controlId='user-password-2'>
        <Form.Label>Password</Form.Label>

        <Form.Control
          required
          type='password'
          name='password2'
          value={password2}
          placeholder='Confirm Password'
          onChange={handleInputChange}
        />

        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>
          Please provide a valid Password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} xs='12'>
        <Button type='submit'>Register</Button>
      </Form.Group>
    </Form>
  )
}

export default SignupForm
