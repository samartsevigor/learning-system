import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { completeHomework } from '../../redux/reducers/inform'

const HomeworkUsers = () => {
  const { work } = useParams()
  const users = useSelector((s) => s.inform.users)
  const usersInProcess = users.filter((el) => !el.homeworks.includes(+work))
  const usersCompleted = users.filter((el) => el.homeworks.includes(+work))
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  const dispatch = useDispatch()
  return (
    <div className="flex justify-center w-full px-10">
      <ul className="w-1/2">
        <li className="font-semibold">In Progress :</li>
        {usersInProcess.map((user) => (
          <li key={user.first_name}>
            <span className="text-red-500">{user.first_name}</span>
            {isAdmin && (
              <button
                type="button"
                className="ml-10 text-green-500"
                onClick={() =>
                  dispatch(completeHomework(user.first_name, [...user.homeworks, +work]))
                }
              >
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
      <ul className="w-1/2">
        <li className="font-semibold">Completed</li>
        {usersCompleted.map((user) => (
          <li key={user.first_name}>
            <span className="text-green-500">{user.first_name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default React.memo(HomeworkUsers)
