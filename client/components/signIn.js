import React from 'react'
import { useDispatch } from 'react-redux'
import Head from './head'
import { signIn } from '../redux/reducers/auth'

const SignIn = () => {
  const [userInformation, setUserInformation] = React.useState({})
  const dispatch = useDispatch()
  return (
    <div className="flex h-screen background">
      <Head title="sign in" />
      <form className="w-full max-w-sm m-auto relative">
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
              placeholder="******************"
              onChange={(e) => setUserInformation({ ...userInformation, password: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(signIn(userInformation))
                }
              }}
            />
          </div>
        </div>
        <div className="text-right mt-5">
          <button
            type="button"
            className="signin-btn hover:bg-black text-white  font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
            onClick={() => dispatch(signIn(userInformation))}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

SignIn.propTypes = {}

export default React.memo(SignIn)
