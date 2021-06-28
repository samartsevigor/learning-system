/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { HashLoader } from 'react-spinners'
import { Redirect, Route, StaticRouter, Switch } from 'react-router-dom'

import store, { history } from '../redux'

import Dashboard from '../components/dashboard'
import NotFound from '../components/404'

import Startup from './startup'
import SignIn from '../components/signIn'
import Editor from '../components/editor'
import EditScores from '../components/leaderboard/editScores'
import HomeworkEditor from '../components/homework/homeworkEditor'
import MaterialAccess from '../components/materialAccess'
import UserModule from '../components/modulesPage/userModule'
import SignUp from "../components/signUp";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)
  const func = (props) =>
    // eslint-disable-next-line no-nested-ternary
    auth.isLoading ? (
      <div className="flex justify-center items-center mt-40">
        <HashLoader color="teal" />
      </div>
    ) : !!auth.token && !!auth.user ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)
  const func = (props) =>
    // eslint-disable-next-line no-nested-ternary
    auth.isLoading ? (
      <div className="flex justify-center items-center mt-40">
        <HashLoader color="teal" />
      </div>
    ) : !!auth.user && !!auth.token && auth.user.role.includes('admin') ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  token: PropTypes.string
}

const defaults = {
  location: {
    pathname: ''
  },
  user: null,
  token: ''
}

PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/login" component={() => <SignIn />} />
            <PrivateRoute exact path="/education/:task" component={() => <Dashboard />} />
            <PrivateRoute exact path="/education/:task/:lesson" component={() => <Dashboard />} />
            <PrivateRoute exact path="/" component={() => <Dashboard />} />
            <PrivateRoute exact path="/homework/list" component={() => <Dashboard />} />
            <PrivateRoute exact path="/homework/list/:work" component={() => <Dashboard />} />
            <AdminRoute exact path="/homework/list/:work/users" component={() => <Dashboard />} />
            <AdminRoute
              exact
              path="/homework/list/:work/edit"
              component={() => <HomeworkEditor />}
            />
            <AdminRoute exact path="/education/:task/:lesson/edit" component={() => <Editor />} />
            <AdminRoute exact path="/admin/users/scores/edit" component={() => <EditScores />} />
            <AdminRoute exact path="/admin/users/modules/edit" component={() => <UserModule />} />
            <AdminRoute exact path="/admin/access" component={() => <MaterialAccess />} />
            <AdminRoute exact path="/admin/users/create" component={() => <SignUp />} />
            <PrivateRoute exact path="/modules/list/" component={() => <Dashboard />} />
            <Route component={() => <NotFound />} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
