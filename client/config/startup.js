import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { trySignIn } from '../redux/reducers/auth'
import { getHomeworks, getWeeks } from '../redux/reducers/inform'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth.token)
  const auth = useSelector((s) => s.auth)
  const location = useSelector((s) => s.router.location.pathname)

  useEffect(() => {
    if (location !== '/login') {
      localStorage.setItem('link', `${location}`)
    }
    if (token) {
      dispatch(trySignIn())
    } else {
      dispatch({ type: 'FAILED_LOAD' })
    }
  }, [dispatch, token])

  useEffect(() => {
    if (!!auth.token && !!auth.user) {
      dispatch(getWeeks())
      dispatch(getHomeworks())
    }
  }, [auth.token, auth.user, dispatch])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default React.memo(Startup)
