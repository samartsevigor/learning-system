import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Comments from './comments'

const HomeworkContent = () => {
  const homeworks = useSelector((s) => s.inform.homeworks)
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  const { work } = useParams()
  const homework = homeworks.find((el) => el.work === +work)
  return homework?.isUnlock || isAdmin ? (
    <div className="border sm:ml-5 mb-5 md:mx-5 sm:mb-0 px-10 pt-5 w-full sm:w-3/5 w-3/5 xl:w-3/4 w-full">
      <div className="text-right">
        {isAdmin ? <Link to={`/homework/list/${work}/edit`}>Editor</Link> : ''}
        {isAdmin && (
          <Link to={`/homework/list/${work}/users`} className="ml-5">
            Users
          </Link>
        )}
      </div>
      <div className="custom-html-style">
        <ReactMarkdown source={homework?.content} />
      </div>
      <Comments />
    </div>
  ) : (
    <div> Homework is locked, stop hacking :)</div>
  )
}

export default HomeworkContent
