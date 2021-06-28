import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/reducers/inform'
import UserScore from './userScore'

const EditScores = () => {
  let users = useSelector((s) => s.inform.users)
  const dispatch = useDispatch()
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers())
    }
  }, [])
  users = users.sort((a, b) => b.score - a.score)

  return (
    <ul>
      {users.map((user, id) => (
        <UserScore user={user} id={id} key={user.first_name} />
      ))}
    </ul>
  )
}
export default React.memo(EditScores)
