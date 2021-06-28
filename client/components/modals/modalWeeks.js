import React from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { createHomework, createWeek } from '../../redux/reducers/inform'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const ModalWeeks = ({ setIsOpen, homework, modalIsOpen }) => {
  const homeworks = useSelector((s) => s.inform.homeworks)
  const [newWeek, setNewWeek] = React.useState({
    date: +new Date()
  })
  const [newHomework, setNewHomework] = React.useState({
    work: homeworks.length + 1,
    date: +new Date(),
    content: 'empty'
  })
  function closeModal() {
    setIsOpen(false)
  }
  const dispatch = useDispatch()
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button
        type="button"
        className="block mb-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded text-right ml-auto mr-0"
        onClick={closeModal}
      >
        close
      </button>
      <form>
        <input
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setNewWeek({ ...newWeek, name: e.target.value })
            setNewHomework({ ...newHomework, name: e.target.value })
          }}
        />

        {homework ? (
          <button
            type="button"
            className="block mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-right ml-auto mr-0"
            onClick={() => dispatch(createHomework(newHomework))}
          >
            Create homework
          </button>
        ) : (
          <button
            type="button"
            className="block mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-right ml-auto mr-0"
            onClick={() => dispatch(createWeek(newWeek))}
          >
            Create
          </button>
        )}
      </form>
    </Modal>
  )
}

export default ModalWeeks
