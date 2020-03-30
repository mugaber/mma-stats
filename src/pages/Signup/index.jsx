import React from 'react'
import './signupPage.scss'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../images/blaze-punch.png'
import { Container, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm'

//

export const SignupPage = ({ user, isAuthenticated, history }) => {
  if (user && isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <div className='signup-page__container'>
      <div className='go-back' onClick={() => history.push('/')}>
        <i className='fas fa-angle-double-left fa-3x' />
      </div>

      <h3>
        <img src={Logo} alt='logo' /> Sign up
      </h3>

      <Container fluid className='signup-form__container'>
        <Col xs='8' sm='6' lg='5' xl='4' className='signup-form'>
          <SignupForm />
        </Col>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(SignupPage)
