import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ModalWeeks from '../modals/modalWeeks'
import Card from '../Card/card'

const HomeworkList = () => {
  const homeworks = useSelector((s) => s.inform.homeworks)
  const { work } = useParams()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const isAdmin = useSelector((s) => s.auth.user.role)[1] === 'admin'
  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="w-full sm:w-2/5 lg:w-1/4">
      {homeworks.map((homework) => (
        <Card
          key={homework.work}
          id={homework.work}
          param={+work}
          type="homework"
          card={homework}
        />
      ))}
      {isAdmin && (
        <button type="button" className="p-10" onClick={openModal}>
          +
        </button>
      )}
      {modalIsOpen && <ModalWeeks setIsOpen={setIsOpen} homework modalIsOpen={modalIsOpen} />}
    </div>
  )
}

export default HomeworkList
