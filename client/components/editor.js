import React, { useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import axios from 'axios'
// import style manually
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../redux/reducers/inform'
import { history } from '../redux'

const mdParser = new MarkdownIt({ html: true })

const Editor = () => {
  const { task, lesson } = useParams()
  const contents = useSelector((s) => s.inform.tasks)
  const content = contents.find((el) => el.date === +lesson)?.content
  const [markdown, setMarkdown] = React.useState(content)
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('/api/v1/user-info').then((res) => {
      if (res.status === 401) {
        history.push('/')
      }
    })
    if (task && contents) {
      dispatch(getTasks(task))
    }
    if (!markdown) {
      setMarkdown(content)
    }
  }, [content, dispatch, task])
  function handleEditorChange({ text }) {
    setMarkdown(text)
  }

  return (
    <div>
      <MdEditor
        value={markdown}
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <button
        type="button"
        /* eslint-disable-next-line no-alert */
        onClick={() =>
          // eslint-disable-next-line no-alert
          axios.post('/api/v1/content', { markdown, task, lesson }).then(({ data }) => alert(data))
        }
      >
        Send
      </button>
    </div>
  )
}

export default Editor
