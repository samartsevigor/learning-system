import * as React from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage } from '../redux/reducers/inform'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

export default function NewEditor({ work }) {
  const user = useSelector((s) => s.auth.user)
  const [value, setValue] = useState('')
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [alert, setAlert] = useState('')
  const dispatch = useDispatch()
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />
      <div className="flex">
        <span className="text-red-500 font-bold">{alert}</span>
        <button
          type="button"
          className="bg-indigo-700 ml-auto mr-0 flex hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (value.length < 10) {
              setAlert('Enter at least 10 symbols')
            } else {
              dispatch(createMessage(work, { user: user.first_name, message: value }))
              setValue('')
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
