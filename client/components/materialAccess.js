import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function changeStatus(date, name, status) {
  axios.post('/api/v1/access', { date, name, status })
}

const MaterialAccess = () => {
  const weeks = useSelector((s) => s.inform.weeks)
  const homeworks = useSelector((s) => s.inform.homeworks)
  return (
    <div className="flex">
      <div className="w-1/2">
        {weeks.map((el) => (
          <div key={el.name}>
            <span className="mr-5">{el.name}</span>
            {el.isUnlock ? (
              <button
                type="button"
                className="text-red-500"
                onClick={() => changeStatus(el.date, 'week', false)}
              >
                Lock
              </button>
            ) : (
              <button
                type="button"
                className="text-green-500"
                onClick={() => changeStatus(el.date, 'week', true)}
              >
                Unlock
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="w-1/2">
        {homeworks.map((el) => (
          <div key={el.name}>
            <span className="mr-5">{el.name}</span>
            {el.isUnlock ? (
              <button
                type="button"
                className="text-red-500"
                onClick={() => changeStatus(el.date, 'homework', false)}
              >
                Lock
              </button>
            ) : (
              <button
                type="button"
                className="text-green-500"
                onClick={() => changeStatus(el.date, 'homework', true)}
              >
                Unlock
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaterialAccess
