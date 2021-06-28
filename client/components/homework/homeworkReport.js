import React from 'react'
import { useSelector } from 'react-redux'

const HomeworkReport = () => {
  const users = useSelector((s) => s.inform.users)
  const homeworks = useSelector((s) => s.inform.homeworks)

  return (
    <div className="flex w-full sm:w-3/5 lg:w-3/4 md:px-10 px-5 mb-5 sm:mb-0 h-1-percent">
      <div className="flex flex-col ">
        <div className="mb-3 font-semibold">Users</div>
        {users.map(
          (user) =>
            user.first_name === 'Nik' ||
            user.first_name === 'Igor' || (
              <div key={user.first_name} className="py-1 pr-5 border-b border-gray-500">
                {user.first_name}
              </div>
            )
        )}
      </div>
      <div className="flex overflow-x-auto">
        {homeworks.map(
          (homework) =>
            homework.isUnlock && (
              <div key={homework.work} className="flex flex-col ">
                <div className="mb-3 px-2">Hw{homework.work}</div>
                {users.map(
                  (user) =>
                    user.first_name === 'Nik' ||
                    user.first_name === 'Igor' || (
                      <div key={user.first_name} className="py-1 px-2 border-b border-gray-500 text-center">
                        {user.homeworks.includes(homework.work) ? (
                          <i className="fas fa-check text-green-500 " />
                        ) : (
                          <i className="fas fa-times text-red-500" />
                        )}
                      </div>
                    )
                )}
              </div>
            )
        )}
      </div>
    </div>
  )
}
export default HomeworkReport
