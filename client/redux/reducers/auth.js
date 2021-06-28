import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const cookies = new Cookies()
const SIGN_IN = 'SIGN_IN'
const initialState = {
  token: cookies.get('token'),
  isLoading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, user: action.user, token: action.token, isLoading: action.isLoading }
    case 'FAILED_LOAD':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export function signIn(userInformation) {
  return (dispatch) => {
    axios.post('/api/v1/signin', userInformation).then(({ data }) => {
      dispatch({
        type: SIGN_IN,
        user: data.user,
        token: data.token,
        isLoading: false
      })
      if (localStorage.getItem('link') && data.user) {
        history.push(localStorage.getItem('link'))
        localStorage.removeItem('link')
      }
    })
  }
}

export function trySignIn() {
  return (dispatch) => {
    axios.get('/api/v1/signin').then(({ data }) => {
      dispatch({
        type: SIGN_IN,
        user: data.user,
        token: data.token,
        isLoading: false
      })
    })
  }
}
