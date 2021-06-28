import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import inform from './inform'
import auth from './auth'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    inform,
    auth
  })

export default createRootReducer
