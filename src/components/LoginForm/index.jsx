import React, { useState } from 'react'
import './style.scss'

import { Form, Button } from 'react-bootstrap'

import axios from 'axios'

//

const Login = () => {
  const [formData, setFormDate] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const handleChange = e => setFormDate({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email || !password) return alert('email and password are required')

    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify({ email, password: password })

    try {
      const res = await axios.post('http://localhost:5000/api/auth', body, config)
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
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

export default Login
