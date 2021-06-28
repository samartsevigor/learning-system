import React, { useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import axios from 'axios'
// import style manually
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux'

const mdParser = new MarkdownIt({ html: true })

const HomeworkEditor = () => {
  const { work } = useParams()

  const homeworks = useSelector((s) => s.inform.homeworks)
  const homeworkContent = homeworks.find((el) => el.work === +work)?.content
  const [markdown, setMarkdown] = React.useState(homeworkContent)
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('/api/v1/user-info').then((res) => {
      if (res.status === 401) {
        history.push('/')
      }
    })
    setMarkdown(homeworkContent)
  }, [work, homeworkContent, dispatch])
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
          axios.post('/api/v1/content', { markdown, work }).then(({ data }) => alert(data))
        }
      >
        Send
      </button>
    </div>
  )
}

export default HomeworkEditor
