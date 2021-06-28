import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from './services/mongoose'
import passportJWT from './services/passport'
import roleCheck from './middleware/roleCheck'
import Tasks from './models/tasks.model'
import Weeks from './models/weeks.model'
import User from './models/User.model'
import Homework from './models/Homework.model'
import Modules from './models/Modules.model'

import config from './config'
import Html from '../client/html'

const Root = () => ''

mongoose.connect(process.env.MONGO_URL)

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  passport.initialize(),
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.post('/api/v1/modules', async (req, res) => {
  const newModule = req.body
  await Modules(newModule).save()
  res.send('success')
})

server.patch('/api/v1/modules', async (req, res) => {
  const { module } = req.body
  await Modules.deleteOne({ module })
  res.send('success')
})

server.post('/api/v1/homeworks', async (req, res) => {
  const newHomework = req.body
  await Homework(newHomework).save()
  res.send('success')
})

server.post('/api/v1/homeworks/comment', async (req, res) => {
  const { work } = req.body
  const { comment } = req.body
  await Homework.updateOne({ work }, { $set: { comments: comment } })
  res.json('success')
})

server.post('/api/v1/homeworks/comments', async (req, res) => {
  const { work } = req.body
  const comments = await Homework.find({ work })
  res.json(comments[0].comments)
})

server.post('/api/v1/homeworks/users', async (req, res) => {
  const { first_name } = req.body
  const { work } = req.body
  await User.updateOne({ first_name }, { $set: { homeworks: work } })
  res.send('success')
})

server.post('/api/v1/weekedit', async (req, res) => {
  const { newName } = req.body
  const { week } = req.body
  await Weeks.updateOne({ week }, { $set: { name: newName } })
  res.send('success')
})

server.post('/api/v1/access', async (req, res) => {
  const { date } = req.body
  const { name } = req.body
  const { status } = req.body
  if (name === 'homework') {
    await Homework.updateOne({ date }, { $set: { isUnlock: status } })
  } else {
    await Weeks.updateOne({ date }, { $set: { isUnlock: status } })
  }
  res.send('success')
})

server.post('/api/v1/taskedit', async (req, res) => {
  const { newName } = req.body
  const { taskId } = req.body
  await Tasks.updateOne({ date: taskId }, { $set: { name: newName } })
  res.send('success')
})

server.patch('/api/v1/task/access', async (req, res) => {
  const { taskId } = req.body
  const { status } = req.body
  await Tasks.updateOne({ date: taskId }, { $set: { isUnlock: status } })
  res.send('success')
})

server.patch('/api/v1/task/delete', async (req, res) => {
  const { taskId } = req.body
  await Tasks.deleteOne({ date: taskId })
  res.send('success')
})

server.post('/api/v1/weeks', async (req, res) => {
  const newWeek = req.body
  await Weeks(newWeek).save()
  res.send('success')
})

server.post('/api/v1/tasks', async (req, res) => {
  const newTask = req.body
  await Tasks(newTask).save()
  res.send('success')
})

server.post('/api/v1/content', async (req, res) => {
  try {
    const content = req.body.markdown
    const week = req.body.task
    const { lesson } = req.body
    const { work } = req.body
    if (work) {
      await Homework.updateOne({ work }, { $set: { content } })
    } else {
      await Tasks.updateOne({ week, date: lesson }, { $set: { content } })
    }
    res.send('Text has been sent')
  } catch (e) {
    console.log(e)
  }
})

server.get('/api/v1/modules', async (req, res) => {
  const modules = await Modules.find({}).sort({ module: -1 })
  res.json(modules)
})

server.get('/api/v1/user-info', roleCheck(['admin']), (req, res) => {
  res.send('home')
  res.json({ status: 'error' })
})

server.get('/api/v1/signin', async (req, res) => {
  try {
    const { token } = req.cookies
    const userID = jwt.verify(token, 'Secret').uid
    res.cookie('token', token, { MaxAge: 1000 * 60 * 60 * 24 })
    const user = await User.findById(userID)
    user.password = ''
    res.json({ user, token })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    res.json({ status: 'error' })
  }
})

server.post('/api/v1/signin', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, 'Secret')
    res.cookie('token', token, { MaxAge: 1000 * 60 * 60 * 24 })
    user.password = ''
    res.json({ user, token })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    res.json({ status: 'error' })
  }
})

server.get('/api/v1/weeks/:task', async (req, res) => {
  const { task } = req.params
  const tasks = await Tasks.find({ week: task })
  res.json(tasks)
})

server.get('/api/v1/weeks', async (req, res) => {
  const weeks = await Weeks.find({}).sort({ date: -1 })
  res.json(weeks)
})
server.get('/api/v1/users', async (req, res) => {
  let users = await User.find({})
  users = users.map((el) => {
    // eslint-disable-next-line no-param-reassign
    el.password = undefined
    return el
  })
  res.json(users)
})

server.get('/api/v1/homeworks', async (req, res) => {
  const homeworks = await Homework.find({}).sort({ work: -1 })
  res.json(homeworks)
})

server.post('/api/v1/users/scores', async (req, res) => {
  try {
    const { score } = req.body
    const { first_name } = req.body
    await User.updateOne({ first_name }, { $set: { score: +score } })
    res.send('updated')
  } catch (e) {
    console.log(e)
    res.send('Error')
  }
})

server.post('/api/v1/users/modules', async (req, res) => {
  try {
    const { modules } = req.body
    const { first_name } = req.body
    await User.updateOne({ first_name }, { $set: { modules } })
    res.send('updated')
  } catch (e) {
    console.log(e)
    res.send('Error')
  }
})

server.post('/api/v1/users/create', async (req, res) => {
  try {
    const newUser = req.body
    await User(newUser).save()
    res.send('saved')
  } catch (e) {
    console.log(e)
    res.status(404).send('Error')
  }
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Samartsev'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
