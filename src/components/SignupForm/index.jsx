import React, { useState } from 'react'

import axios from 'axios'

import { Modal, Form, Popup, Button, Label, Icon, Message } from 'semantic-ui-react'

//

const initFormErrors = {
  name: { state: false, text: '' },
  email: { state: false, text: '' },
  password1: { state: false, text: '' },
  password2: { state: false, text: '' }
}

//

const SignupForm = ({ showModal, setShowModal }) => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  })

  const { name, email, password1, password2 } = formInputs

  const [formErrors, setFormErrors] = useState(initFormErrors)

  const [formLoading, setFormLoading] = useState(false)

  const [signupResponse, setSignupResponse] = useState({
    show: false,
    type: '',
    text: ''
  })

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
    const body = JSON.stringify({ name, email, password1 })

    try {
      const res = await axios.post('http://localhost:5000/api/users', body, config)

      console.log(res.data)
      setSignupResponse({ show: true, type: 'success' })
    } catch (error) {
      console.error(error.response.data)
      setSignupResponse({
        show: true,
        type: 'error',
        text: error.response.data.errors[0].msg
      })
    }
  }

  return (
    <Modal open={showModal} size='tiny'>
      <Modal.Header>Sign up</Modal.Header>
      <Modal.Content>
        <Label floating style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)}>
          <Icon name='close' />
        </Label>

        <Form size='large' onSubmit={handleSubmit} loading={formLoading}>
          <Popup
            inverted
            style={{ opacity: 0.8 }}
            position='right center'
            open={formErrors.name.state}
            content={formErrors.name.text}
            trigger={
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                required
                name='name'
                value={name}
                placeholder='Nname'
                onChange={handleInputChange}
                error={formErrors.name.state}
              />
            }
          />

          <Popup
            inverted
            style={{ opacity: 0.8 }}
            position='right center'
            open={formErrors.email.state}
            content={formErrors.email.text}
            trigger={
              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                required
                name='email'
                value={email}
                placeholder='E-mail'
                onChange={handleInputChange}
                error={formErrors.email.state}
              />
            }
          />

          <Popup
            inverted
            style={{ opacity: 0.8 }}
            position='right center'
            open={formErrors.password1.state}
            content={formErrors.password1.text}
            trigger={
              <Form.Input
                fluid
                icon='lock'
                type='password'
                iconPosition='left'
                required
                name='password1'
                value={password1}
                placeholder='Password'
                onChange={handleInputChange}
                error={formErrors.password1.state}
              />
            }
          />

          <Popup
            inverted
            style={{ opacity: 0.8 }}
            position='right center'
            open={formErrors.password2.state}
            content={formErrors.password2.text}
            trigger={
              <Form.Input
                fluid
                icon='lock'
                type='password'
                iconPosition='left'
                required
                name='password2'
                value={password2}
                placeholder='Confirm Password'
                onChange={handleInputChange}
                error={formErrors.password2.state}
              />
            }
          />

          <Button color='teal' fluid size='large' className='register-button'>
            Register
          </Button>

          {signupResponse.show && signupResponse.type === 'success' && (
            <Message header='Sign up success' />
          )}

          {signupResponse.show && signupResponse.type === 'error' && (
            <Message error header='Sign up failure' content={signupResponse.text} />
          )}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default SignupForm
