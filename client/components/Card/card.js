import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../../redux'

const Card = ({ id, card, param, type }) => {
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  const user = useSelector((s) => s.auth.user)
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      type="button"
      className={`${
        param === id ? 'bg-indigo-800 text-white ' : ''
      } rounded border border-gray-300 shadow-md hover:shadow-lg p-3 px-5 mb-3 cursor-pointer`}
      onClick={() => {
        if (card.isUnlock || isAdmin) {
          if (type === 'week') {
            history.push(`/education/${id}`)
          }
          if (type === 'homework') {
            history.push(`/homework/list/${id}`)
          }
        }
      }}
    >
      <div
        className={`${
          param === id ? 'text-white' : 'text-gray-700'
        } text-xs flex justify-between items-center`}
      >
        {type === 'week' ? 'WEEK' : 'HOMEWORK'} {id}
        {type === 'homework' && user?.homeworks.find((el) => el === id) && (
          <i className="fas fa-check text-green-500 " />
        )}
      </div>
      <div className="font-medium text-xl tracking-wide">{card.name}</div>
      <div className="text-sm text-gray-600">{new Date(card.date).toDateString()}</div>
      {card.isUnlock || (
        <div className="text-sm text-gray-800">
          <i className="fas fa-lock mr-2" />
          {type === 'week' ? 'Week closed' : 'Homework closed'}
        </div>
      )}
    </div>
  )
}

export default Card
