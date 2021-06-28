import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const Links = () => {
  const { task, lesson } = useParams()
  const weeks = useSelector((s) => s.inform.weeks)
  const tasks = useSelector((s) => s.inform.tasks)
  const aTask = tasks.find((el) => el.date === +lesson)
  const [week, setWeek] = useState('')
  useEffect(() => {
    setWeek(weeks.find((el) => el.week === task))
  }, [task, weeks])
  if (!task || !week) return null
  return (
    <div className="text-sm mx-10 mt-5">
      <Link className="text-blue-600 hover:text-blue-700" to={`/education/${week.week}`}>
        {week.name}
      </Link>
      {lesson && <span> / {aTask?.name} </span>}
    </div>
  )
}

export default Links
