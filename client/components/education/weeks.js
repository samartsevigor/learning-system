import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ModalWeeks from '../modals/modalWeeks'
import { editWeek } from '../../redux/reducers/inform'
import Card from '../Card/card'

const Weeks = () => {
  const dispatch = useDispatch()
  const weeks = useSelector((s) => s.inform.weeks)
  const { task } = useParams()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  function openModal() {
    setIsOpen(true)
  }
  function editWeekFunc(weekName, week) {
    // eslint-disable-next-line no-alert
    const newName = prompt('Введите название', weekName)
    if (newName !== null) {
      dispatch(editWeek(newName, week))
    }
  }
  return (
    <div className={`${task ? 'hidden ' : 'block'} sm:block w-full sm:w-2/5 xl:w-1/4`}>
      {weeks.map((week) => (
        <Fragment key={week.week}>
          <Card id={week.week} card={week} param={task} type="week" />
          {isAdmin && (
            <button
              type="button"
              className="p-2"
              onClick={() => editWeekFunc(week.name, week.week)}
            >
              Edit
            </button>
          )}
        </Fragment>
      ))}
      {isAdmin && (
        <button
          type="button"
          className="px-5 py-2 block border border-black mt-5 ml-5 "
          onClick={openModal}
        >
          add new week
        </button>
      )}
      <ModalWeeks setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
    </div>
  )
}

export default Weeks
