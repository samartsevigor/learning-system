import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../../redux/reducers/inform'

const Leaderboard = ({ isOpen, leaderBoardHandler }) => {
  const dispatch = useDispatch()
  const I = useSelector((s) => s.auth.user)
  const users = useSelector((s) => s.inform.users)
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        type="button"
        className={`${
          isOpen ? 'block' : 'hidden '
        } fixed w-full h-full z-10 bg-black top-0 left-0 bg-opacity-25`}
        onClick={leaderBoardHandler}
      />
      <div
        className={`fixed z-50 bg-gray-200 shadow-lg right-0 md:max-w-sm w-full top-0 h-full transform transition-all duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex  items-center justify-between h-16 px-4">
          Leaderboard
          {isAdmin && <Link to="/admin/users/scores/edit"> Edit </Link>}
          <button
            type="button"
            onClick={leaderBoardHandler}
            className="text-gray-700 hover:text-gray-300 hover:bg-gray-700 px-2 rounded"
          >
            <i className="fas fa-times text-lg" />
          </button>
        </div>
        <div className="bg-white list-h overflow-auto">
          {users
            .sort((a, b) => b.score - a.score)
            .map((user, id) => (
              <div
                key={user.first_name}
                className={`flex items-center justify-between p-4 bg-white shadow-sm mb-px ${
                  I.first_name === user.first_name && 'border-l-4 border-indigo-600'
                }`}
              >
                <div>
                  <span className="mr-2">
                    {id < 9 && 0}
                    {id + 1}.
                  </span>
                  <p className="inline">{user.first_name}</p>
                  {I.first_name === user.first_name && <strong className="ml-2">you</strong>}
                  {id === 0 && <i className="fas fa-award text-orange-300 pl-5" />}
                  {id === 1 && <i className="fas fa-award text-gray-400 pl-5" />}
                  {id === 2 && <i className="fas fa-award text-orange-400 pl-5" />}
                </div>
                <div>{user.score}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default React.memo(Leaderboard)
