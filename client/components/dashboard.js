import React from 'react'
import { Route } from 'react-router-dom'
import Header from './header'
import NavContent from './navcontent'
import Lesson from './education/lesson'
import Links from './links'
import Homework from './homework/homework'
import Modules from './modulesPage/Module'

const Dashboard = () => {
  return (
    <>
      <Header />
      <Links />
      <Route exact path="/education/:task/:lesson" component={() => <Lesson />} />
      <Route exact path="/" component={() => <NavContent />} />
      <Route exact path="/homework/list" component={() => <Homework />} />
      <Route exact path="/homework/list/:work" component={() => <Homework />} />
      <Route exact path="/homework/list/:work/users" component={() => <Homework />} />
      <Route exact path="/education/:task" component={() => <NavContent />} />
      <Route exact path="/modules/list" component={() => <Modules />} />
    </>
  )
}

Dashboard.propTypes = {}

export default React.memo(Dashboard)
