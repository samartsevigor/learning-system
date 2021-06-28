import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { changeStatusLesson, deleteLesson, editTask, getTasks } from '../../redux/reducers/inform'
import { history } from '../../redux'
import ModalTasks from '../modals/modalTasks'

const Tasks = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  function openModal() {
    setIsOpen(true)
  }
  const { task } = useParams()
  const weeks = useSelector((s) => s.inform.weeks)
  const isUnlocked = weeks.find((el) => el.week === task)?.isUnlock
  const tasks = useSelector((s) => s.inform.tasks)
  const dispatch = useDispatch()
  useEffect(() => {
    if (task) {
      dispatch(getTasks(task))
    }
  }, [dispatch, task])

  function editTaskFunc(taskName, taskId) {
    // eslint-disable-next-line no-alert
    const newName = prompt('Введите название', taskName)
    if (newName !== null) {
      dispatch(editTask(newName, taskId))
    }
  }
  function changeStatus(taskId, status) {
    dispatch(changeStatusLesson(taskId, status))
  }
  function deleteTask(taskId) {
    dispatch(deleteLesson(taskId))
  }

  if (tasks.length > 0 && +task !== tasks[0].week)
    return (
      <div className="flex sm:w-3/5 w-3/5 xl:w-3/4 w-full justify-center mt-40">
        <HashLoader color="teal" />
      </div>
    )
  return isUnlocked || isAdmin ? (
    <div className="border mx-5 sm:w-3/5 w-3/5 xl:w-3/4 w-full">
      {tasks.map((el) => {
        return (
          (el.isUnlock || isAdmin) && (
            <Fragment key={el.name}>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
              <div
                className="hover:text-indigo-800 rounded border-b border-gray-300 p-3 pr-5 ml-5  cursor-pointer"
                onClick={() =>
                  (isAdmin || el.isUnlock) && history.push(`/education/${task}/${el.date}`)
                }
              >
                <div className="font-medium  tracking-wide">
                  {el.name}
                  {isAdmin && (
                    <button
                      type="button"
                      className="p-2"
                      onClick={() => editTaskFunc(el.name, el.date)}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {el.description && <div className=" font-light">{el.description}</div>}
              </div>
              {isAdmin &&
                (el.isUnlock ? (
                  <button
                    type="button"
                    className="ml-5 px-2 py-1 border-red-400 border"
                    onClick={() => changeStatus(el.date, false)}
                  >
                    Lock
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ml-5 px-2 py-1 border-green-400 border"
                    onClick={() => changeStatus(el.date, true)}
                  >
                    Unlock
                  </button>
                ))}
              {isAdmin && (
                <button
                  type="button"
                  className="text-red-500 ml-10"
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals,no-alert
                    if (confirm(`are you sure want to delete ${el.name} ?`)) {
                      deleteTask(el.date)
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </Fragment>
          )
        )
      })}
      {isAdmin && (
        <button
          type="button"
          className="px-5 py-2 block border border-black mt-5 ml-5 "
          onClick={openModal}
        >
          add new lecture
        </button>
      )}
      {modalIsOpen && <ModalTasks setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />}
    </div>
  ) : (
    <div> This week is closed, stop hacking :)</div>
  )
}

export default Tasks
