import React from 'react'
import { Route } from 'react-router-dom'
import Weeks from './education/weeks'
import Tasks from './education/tasks'
import Head from './head'

const NavContent = () => {
  return (
    <div className="flex m-4 mt-3">
      <Head title="Dashboard" />
      <Weeks />
      <Route exact path="/education/:task" component={() => <Tasks />} />
    </div>
  )
}

export default NavContent
