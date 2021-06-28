import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { HashLoader } from 'react-spinners'
import { getTasks } from '../../redux/reducers/inform'
import Head from '../head'
import CodeBlock from '../CodeBlock'

const Lesson = () => {
  const userRole = useSelector((s) => s.auth.user)?.role[1]
  const dispatch = useDispatch()
  const { task, lesson } = useParams()
  useEffect(() => {
    dispatch(getTasks(task))
  }, [dispatch, lesson, task])
  const tasks = useSelector((s) => s.inform.tasks)
  const aTask = tasks.find((el) => el.date === +lesson)
  const taskId = tasks.indexOf(aTask)
  console.log(process.env.NODE_ENV)
  console.log('fsfsf')
  return aTask ? (
    <div className="flex flex-col mx-10">
      <Head title={aTask?.name} />
      <div className="text-right">
        {userRole === 'admin' ? <Link to={`/education/${task}/${lesson}/edit`}>Editor</Link> : ''}
      </div>
      <div className="custom-html-style">
        <ReactMarkdown source={aTask.content} renderers={{ code: CodeBlock }} />
      </div>
      <div className="flex justify-between mt-10">
        <Link
          className="border border-black bg-indigo-800 text-white py-1 px-2"
          to={tasks[taskId - 1]?.date ? `/education/${task}/${tasks[taskId - 1]?.date}` : undefined}
        >
          Back
        </Link>
        <Link
          className="border border-black bg-indigo-800 text-white py-1 px-2"
          to={tasks[taskId + 1]?.date ? `/education/${task}/${tasks[taskId + 1]?.date}` : undefined}
        >
          Next
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-40">
      <HashLoader color="teal" />
    </div>
  )
}
export default Lesson
