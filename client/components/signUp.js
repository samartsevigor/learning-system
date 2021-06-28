import React from 'react'
import axios from 'axios'
import Head from './head'

const SignUp = () => {
  const [userInformation, setUserInformation] = React.useState({})
  const [createStatus, setCreateStatus] = React.useState('')
  const successCreate = (status) => {
    console.log(status)
    if (status === 404) {
      setCreateStatus('Error, try again')
    } else {
      setCreateStatus('User created')
      setUserInformation({ password: '', first_name: '' })
    }
    setTimeout(() => setCreateStatus(''), 2000)
  }

  return (
    <div className="flex h-screen background">
      <Head title="sign up" />
      <form className="w-full max-w-sm m-auto relative">
        <h2 className="text-white font-xl3">{createStatus}</h2>

        <span className="text-white">создание клиентов</span>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              value={userInformation.first_name}
              placeholder="Jane"
              onChange={(e) =>
                setUserInformation({ ...userInformation, first_name: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              value={userInformation.password}
              placeholder="******************"
              onChange={(e) => setUserInformation({ ...userInformation, password: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  axios
                    .post('/api/v1/users/create', userInformation)
                    .then(() => successCreate())
                    .catch(() => successCreate(404))
                }
              }}
            />
          </div>
        </div>
        <div className="text-right mt-5">
          <button
            type="button"
            className="signin-btn hover:bg-black text-white  font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
            onClick={() =>
              axios
                .post('/api/v1/users/create', userInformation)
                .then(() => successCreate())
                .catch(() => successCreate(404))
            }
          >
            Создать юзера
          </button>
        </div>
      </form>
    </div>
  )
}

SignUp.propTypes = {}

export default React.memo(SignUp)
