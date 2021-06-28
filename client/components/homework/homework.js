import React from 'react'
import { Route } from 'react-router-dom'
import Head from '../head'
import HomeworkList from './homeworklist'
import HomeworkContent from './homeworkcontent'
import HomeworkUsers from './homeworkUsers'
import HomeworkReport from './homeworkReport'

const Homework = () => {
  return (
    <div className="flex m-4 mt-3 flex-col-reverse sm:flex-row">
      <Head title="Dashboard" />
      <HomeworkList />
      <Route exact path="/homework/list/" component={() => <HomeworkReport />} />
      <Route exact path="/homework/list/:work" component={() => <HomeworkContent />} />
      <Route exact path="/homework/list/:work/users" component={() => <HomeworkUsers />} />
    </div>
  )
}

export default Homework
