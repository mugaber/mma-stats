import axios from 'axios'
import { setAuthToken } from '../../utils'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOGOUT,
} from '../actionTypes'

//

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

//

export const register = ({ name, email, password }) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify({ name, email, password })

  // https://bold-nonchalant-alpaca.glitch.me

  try {
    const res = await axios.post('/api/users', body, config)
    console.log('from register', res)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    console.log('from register error', err.response, errors)

    // TO-DO: SET UP AN ALERT

    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

//

export const login = (email, password) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    console.log(errors)

    // TO-DO: SET UP AN ALERT

    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

//

export const logout = () => dispatch => {
  dispatch({ type: USER_LOGOUT })
}
