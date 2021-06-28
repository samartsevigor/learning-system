import React from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createTask } from '../../redux/reducers/inform'

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

const ModalTasks = ({ setIsOpen, modalIsOpen }) => {
  const { task } = useParams()

  const [newTask, setNewTask] = React.useState({ week: +task, date: +new Date(), content: '' })
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
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          className=" mt-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Description"
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button
          type="button"
          className="block mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-right ml-auto mr-0"
          onClick={() => dispatch(createTask(newTask))}
        >
          Create
        </button>
      </form>
    </Modal>
  )
}

export default ModalTasks
