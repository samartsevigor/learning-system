import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserModuleScore from './userModuleScore'
import { getModules, getUsers } from '../../redux/reducers/inform'

const UserModule = () => {
  const modules = useSelector((s) => s.inform.modules)
  let users = useSelector((s) => s.inform.users)
  const dispatch = useDispatch()
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers())
    }
    if (modules.length === 0) {
      dispatch(getModules())
    }
  }, [dispatch, modules.length, users.length])
  users = users.sort((a, b) => b.score - a.score)

  const [module, setModule] = React.useState('')
  return (
    <>
      <select
        className={module ? '' : 'text-red-500 font-semibold text-xl'}
        onClick={(e) => setModule(e.target.value)}
      >
        <option value="">Choose module</option>
        {modules.map((el) => (
          <option key={el.module} value={el.module}>
            {el.name}
          </option>
        ))}
      </select>
      <ul>
        {users.map((user, id) => (
          <UserModuleScore user={user} id={id} key={user.first_name} oneModule={module} />
        ))}
      </ul>
    </>
  )
}
export default React.memo(UserModule)
