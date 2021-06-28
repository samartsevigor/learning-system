import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Head from '../head'
import { createModule, getModules } from '../../redux/reducers/inform'

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

const Modules = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getModules())
  }, [dispatch])
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  function deleteModule(module) {
    axios.patch('/api/v1/modules', { module })
    dispatch(getModules())
  }
  const modules = useSelector((s) => s.inform.modules)
  const users = useSelector((s) => s.inform.users)
  const [newModule, setNewModule] = React.useState({})
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  return (
    <>
      <div className="flex mt-5 mx-5 ">
        <Head title="Dashboard" />
        <div className="w-1/2 sm:w-full  md:w-auto">
          <div className="font-medium py-2 px-5 text-xl ">Modules:</div>
          {modules.map((module) => (
            <div
              key={module.module}
              className="font-medium md:text-xl tracking-wide py-2 px-5 md:h-12 h-32  border-b border-black flex items-center md:whitespace-no-wrap  "
            >
              {module.name}
              {isAdmin && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals,no-alert
                    if (confirm(`are you sure want to delete ${module.name} ?`)) {
                      deleteModule(module.module)
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex overflow-auto w-1/2 sm:w-auto">
          {users.map((user) => (
            <div key={user.first_name} className="font-medium ">
              <div className="p-2 text-xl">{user.first_name}</div>
              {modules.map((module) => (
                <div
                  key={module.module}
                  className="flex items-center justify-center py-2 md:h-12 h-32  border-b border-black "
                >
                  {user.modules && user.modules[module.module] ? (
                    <div
                      className={`${
                        // eslint-disable-next-line no-nested-ternary
                        user.modules[module.module] < 3
                          ? 'text-red-600'
                          : // eslint-disable-next-line no-nested-ternary
                          user.modules[module.module] < 6
                          ? 'text-orange-400'
                          : user.modules[module.module] < 8
                          ? 'text-green-300'
                          : 'text-green-600 '
                      } font-medium`}
                    >
                      {user.modules[module.module]}
                    </div>
                  ) : (
                    <i className="fas font-medium fa-times text-red-500" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {isAdmin && (
        <div>
          <button
            type="button"
            className="p-3 mt-5 ml-5 border border-black hover:border-gray-500 hover:text-gray-600"
            onClick={openModal}
          >
            add a new module
          </button>
          <Link
            exact
            to="/admin/users/modules/edit"
            className="p-3 mt-5 ml-5 border border-black hover:border-gray-500 hover:text-gray-600"
          >
            Edit score
          </Link>
        </div>
      )}

      {modalIsOpen && (
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
                setNewModule({ name: e.target.value })
              }}
            />
            <button
              type="button"
              className="block mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-right ml-auto mr-0"
              onClick={() => {
                dispatch(createModule(newModule))
                closeModal()
              }}
            >
              Create module
            </button>
          </form>
        </Modal>
      )}
    </>
  )
}

export default Modules
