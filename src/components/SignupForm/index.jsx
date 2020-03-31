import React, { useState } from 'react'
import './style.scss'

import * as yup from 'yup'
import { Formik } from 'formik'
import { Form, Button, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import { register } from '../../redux/auth/actions'

//

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: yup
    .string()
    .email('Please provide valid email')
    .required('Required'),
  password: yup
    .string()
    .min(8, 'At least 8 charachters')
    .required('Required'),
  password2: yup
    .string()
    .min(8, 'At least 8 charachters')
    .required('Required')
})

//

const SignupForm = ({ register }) => {
  const [formLoading, setFormLoading] = useState(false)

  return (
    <Formik
      validationSchema={schema}
      validateOnChange
      initialValues={{
        name: '',
        email: '',
        password: '',
        password2: ''
      }}
      onSubmit={async values => {
        const { name, email, password, password2 } = values
        if (password !== password2) return alert('passwords do not match')
        setFormLoading(true)
        await register({ name, email, password })
        setFormLoading(false)
      }}
    >
      {({ values, touched, errors, handleSubmit, handleChange }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User name</Form.Label>
            <Form.Control
              required
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
              placeholder='Enter your name'
            />
            <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
              placeholder='Enter email'
            />
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
              placeholder='Password'
            />
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              required
              name='password2'
              value={values.password2}
              onChange={handleChange}
              isValid={touched.password2 && !errors.password2}
              isInvalid={!!errors.password2}
              placeholder='Confirm your password'
            />
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              {errors.password2}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='primary' type='submit'>
            {formLoading ? <Spinner animation='border' /> : <>Submit</>}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default connect(null, { register })(SignupForm)
