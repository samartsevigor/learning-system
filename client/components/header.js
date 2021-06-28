import React, {useCallback} from 'react'
import Cookies from 'universal-cookie'
import { useSelector } from 'react-redux'
import { history } from '../redux'
import Leaderboard from './leaderboard/leaderboard'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const cookies = new Cookies()
  const user = useSelector((s) => s.auth.user)
  const [dropdownIsOpen, setDropdownIsOpen] = React.useState(false)

  const dropdownHandler = useCallback(() => {
    setDropdownIsOpen((prev) => !prev)
  }, [])

  const leaderBoardHandler = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-800  h-20 px-10 py-2">
      <Leaderboard isOpen={isOpen} leaderBoardHandler={leaderBoardHandler} />
      <button
        type="button"
        className="flex items-center focus:outline-none flex-shrink-0 text-xs sm:text-xl font-medium text-orange-400 pr-6 border-r border-black h-full "
        onClick={() => history.push('/')}
      >
        IT BOOTCAMP
      </button>
      <div
        className={`${
          dropdownIsOpen ? 'flex' : 'hidden '
        } absolute right-18 top-75 lg:static lg:flex-row bg-indigo-800 lg:bg-transparent flex-col lg:flex justify-between items-center text-white  font-semibold `}
      >
        <button
          type="button"
          onClick={() => history.push('/homework/list')}
          className="w-32 md:w-auto mb-2 lg:mb-0 border mx-3 font-bold border-black text-white px-4 py-2 hover:text-black hover:bg-indigo-600"
        >
          Homework
        </button>
        <button
          type="button"
          onClick={() => history.push('/modules/list')}
          className="w-32 md:w-auto mb-2 lg:mb-0 border mx-3 font-bold border-black text-white px-4 py-2 hover:text-black hover:bg-indigo-600"
        >
          Modules
        </button>
        <button
          type="button"
          onClick={leaderBoardHandler}
          className="w-32 md:w-auto mb-2 lg:mb-0 border mx-3 font-bold border-black text-white px-4 py-2 hover:text-black hover:bg-indigo-600"
        >
          {user && `Scores : ${user.score}`}
        </button>
        <button
          type="button"
          onClick={() => {
            cookies.remove('token')
            history.push('/login')
          }}
          className="w-32 md:w-auto mb-2 md:mb-0 border mx-3 font-bold border-black text-white px-4 py-2 hover:text-black hover:bg-indigo-600"
        >
          Log Out
        </button>
      </div>
      <button
        type="button"
        className=" mx-3 font-bold text-white block lg:hidden"
        onClick={dropdownHandler}
      >
        Profile <i className="fas fa-chevron-down" />
      </button>
    </nav>
  )
}

export default React.memo(Header)
