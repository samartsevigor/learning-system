import React from 'react'
import axios from 'axios'

const UserScore = ({ user, id}) => {
  const [score, setScore] = React.useState('')
  return (
    <>
      <li key={user.first_name} className="flex items-center p-4 bg-white shadow-sm mb-px">
        <div>
          <span className="mr-2">
            {id < 9 && 0}
            {id + 1}.
          </span>
          <p className="inline">{user.first_name}</p>
        </div>
        <div className="pl-10">{user.score}</div>
        <input
          type="text"
          value={score}
          className="border border-black ml-10 px-2"
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            axios.post('/api/v1/users/scores', { score, first_name: user.first_name })
            // eslint-disable-next-line no-param-reassign
            user.score = score
            setScore('')
          }}
          className="ml-4"
        >
          Update
        </button>
      </li>
    </>
  )
}

export default UserScore
