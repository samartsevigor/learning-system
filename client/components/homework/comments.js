import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { deleteMessage, getComments } from '../../redux/reducers/inform'
import NewEditor from '../neweditor'
import CodeBlock from '../CodeBlock'

const Comments = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const { work } = useParams()
  const dispatch = useDispatch()
  const comments = useSelector((s) => s.inform.comments)
  const user = useSelector((s) => s.auth.user)
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  const [personalComment, setPersonalComment] = useState(comments)

  useEffect(() => {
    dispatch(getComments(work))
  }, [dispatch, work])

  useEffect(() => {
    setPersonalComment(comments)
  }, [comments])

  const usersList = comments.reduce((acc, rec) => {
    return acc.includes(rec.user) ? acc : [...acc, rec.user]
  }, [])

  function sortMessages(name = 'all') {
    setPersonalComment(comments.filter((el) => name === el.user || name === 'all'))
  }
  return (
    <div className="mt-24">
      {isAdmin && (
        <select onChange={(e) => sortMessages(e.target.value)}>
          <option value="all">All</option>
          {usersList.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      )}
      {personalComment.map(
        (el) =>
          (user.first_name === el.user || isAdmin) && (
            <div className=" mb-5 border-b border-gray-400 pb-3" key={el.date}>
              <div className="flex justify-between">
                <span className="font-semibold">{el.user} sent a message:</span>
                <button
                  type="button"
                  onClick={() => dispatch(deleteMessage(work, el.date))}
                  className="text-red-500"
                >
                  <i className="far fa-window-close" />
                </button>
              </div>
              <div className="custom-html-style">
                <ReactMarkdown source={el.message} renderers={{ code: CodeBlock }} />
              </div>
              <div className="mt-3 text-right text-gray-800 text-sm">
                {new Date(el.date).toLocaleTimeString(navigator.language, options)}
              </div>
            </div>
          )
      )}
      <div className="mb-10">
        <NewEditor work={work} />
      </div>
    </div>
  )
}

export default Comments
