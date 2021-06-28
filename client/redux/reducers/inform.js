import axios from 'axios'

const GET_WEEKS = 'GET_WEEKS'
const GET_TASKS = 'GET_TASKS'
const GET_USERS = 'GET_USERS'
const GET_MODULES = 'GET_MODULES'
const CREATE_WEEK = 'CREATE_WEEK'
const CREATE_TASK = 'CREATE_TASK'
const CREATE_HOMEWORK = 'CREATE_HOMEWORK'
const CREATE_MESSAGE = 'CREATE_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'
const GET_HOMEWORKS = 'GET_HOMEWORKS'
const GET_COMMENTS = 'GET_COMMENTS'
const COMPLETE_HOMEWORK = 'COMPLETE_HOMEWORK'
const EDIT_WEEK = 'EDIT_WEEK'
const EDIT_TASK = 'EDIT_TASK'
const CREATE_MODULE = 'CREATE_MODULE'
const CHANGE_STATUS_LESSON = 'CHANGE_STATUS_LESSON'
const DELETE_LESSON = 'DELETE_LESSON'

const initialState = {
  weeks: [],
  tasks: [],
  users: [],
  homeworks: [],
  comments: [],
  modules: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEEKS:
      return { ...state, weeks: action.weeks }
    case GET_TASKS:
      return { ...state, tasks: action.tasks }
    case CREATE_TASK:
      return { ...state, tasks: [...state.tasks, action.newTask] }
    case CREATE_WEEK:
      return { ...state, weeks: [action.newWeek, ...state.weeks] }
    case CREATE_HOMEWORK:
      return { ...state, homeworks: [action.newHomework, ...state.homeworks] }
    case CREATE_MODULE:
      return { ...state, modules: [action.newModule, ...state.modules] }
    case CREATE_MESSAGE:
      return { ...state, comments: [...state.comments, action.message] }
    case DELETE_MESSAGE:
      return { ...state, comments: action.comment }
    case GET_USERS:
      return { ...state, users: action.users }
    case GET_HOMEWORKS:
      return { ...state, homeworks: action.homeworks }
    case GET_MODULES:
      return { ...state, modules: action.modules }
    case GET_COMMENTS:
      return { ...state, comments: action.comments || [] }
    case COMPLETE_HOMEWORK:
      return { ...state, users: action.users }
    case EDIT_WEEK:
      return { ...state, weeks: action.newWeeks }
    case EDIT_TASK:
      return { ...state, tasks: action.newTasks }
    case CHANGE_STATUS_LESSON:
      return { ...state, tasks: action.newTasks }
    case DELETE_LESSON:
      return { ...state, tasks: action.newTasks }
    default:
      return state
  }
}

export function getWeeks() {
  return (dispatch) => {
    axios.get('/api/v1/weeks').then(({ data: weeks }) => dispatch({ type: GET_WEEKS, weeks }))
  }
}

export function getTasks(task) {
  return (dispatch) => {
    axios
      .get(`/api/v1/weeks/${task}`)
      .then(({ data: tasks }) => dispatch({ type: GET_TASKS, tasks }))
  }
}

export function createTask(newTask) {
  return (dispatch) => {
    axios.post('/api/v1/tasks', newTask)
    console.log(newTask.week)
    dispatch({ type: CREATE_TASK, newTask })
  }
}

export function createWeek(newWeek) {
  return (dispatch, getState) => {
    const { weeks } = getState().inform
    // eslint-disable-next-line no-param-reassign
    newWeek.week = weeks.length + 1
    axios.post('/api/v1/weeks', newWeek)
    dispatch({ type: CREATE_WEEK, newWeek })
  }
}
export function createHomework(newHomework) {
  return (dispatch) => {
    axios.post('/api/v1/homeworks', newHomework)
    dispatch({ type: CREATE_HOMEWORK, newHomework })
  }
}

export function editWeek(newName, week) {
  return (dispatch, getState) => {
    const { weeks } = getState().inform
    const newWeeks = weeks.reduce((acc, rec) => {
      if (rec.week === week) {
        return [...acc, { ...rec, name: newName }]
      }
      return [...acc, rec]
    }, [])
    axios.post('/api/v1/weekedit', { newName, week })
    dispatch({ type: EDIT_WEEK, newWeeks })
  }
}

export function editTask(newName, taskId) {
  return (dispatch, getState) => {
    const { tasks } = getState().inform
    const newTasks = tasks.reduce((acc, rec) => {
      if (rec.date === taskId) {
        return [...acc, { ...rec, name: newName }]
      }
      return [...acc, rec]
    }, [])
    axios.post('/api/v1/taskedit', { newName, taskId })
    dispatch({ type: EDIT_TASK, newTasks })
  }
}

export function changeStatusLesson(taskId, status) {
  return (dispatch, getState) => {
    const { tasks } = getState().inform
    const newTasks = tasks.reduce((acc, rec) => {
      if (rec.date === taskId) {
        return [...acc, { ...rec, isUnlock: status }]
      }
      return [...acc, rec]
    }, [])
    axios.patch('/api/v1/task/access', { taskId, status })
    dispatch({ type: CHANGE_STATUS_LESSON, newTasks })
  }
}

export function deleteLesson(taskId) {
  return (dispatch, getState) => {
    const { tasks } = getState().inform
    const newTasks = tasks.reduce((acc, rec) => {
      if (rec.date === taskId) {
        return acc
      }
      return [...acc, rec]
    }, [])
    axios.patch('/api/v1/task/delete', { taskId })
    dispatch({ type: DELETE_LESSON, newTasks })
  }
}

export function getUsers() {
  return (dispatch) => {
    axios.get('/api/v1/users').then(({ data: users }) => dispatch({ type: GET_USERS, users }))
  }
}

export function getModules() {
  return (dispatch) => {
    axios
      .get('/api/v1/modules')
      .then(({ data: modules }) => dispatch({ type: GET_MODULES, modules }))
  }
}

export function createModule(NewModule) {
  return (dispatch, getState) => {
    const { modules } = getState().inform
    const newModule = {
      ...NewModule,
      date: +new Date(),
      module: modules[0] ? modules[0].module + 1 : 1
    }
    axios.post('/api/v1/modules', newModule)
    dispatch({ type: CREATE_MODULE, newModule })
  }
}

export function getHomeworks() {
  return (dispatch) => {
    axios
      .get('/api/v1/homeworks')
      .then(({ data: homeworks }) => dispatch({ type: GET_HOMEWORKS, homeworks }))
  }
}
export function getComments(work) {
  return (dispatch) => {
    axios
      .post('/api/v1/homeworks/comments', { work })
      .then(({ data: comments }) => dispatch({ type: GET_COMMENTS, comments }))
  }
}
export function createMessage(work, newMessage) {
  const message = {
    ...newMessage,
    date: +new Date()
  }
  return (dispatch, getState) => {
    const { comments } = getState().inform
    const comment = [...comments, message]
    axios.post('/api/v1/homeworks/comment', {
      work,
      comment
    })
    dispatch({ type: CREATE_MESSAGE, message })
  }
}

export function deleteMessage(work, date) {
  return (dispatch, getState) => {
    const { comments } = getState().inform
    const comment = comments.filter((el) => el.date !== date)
    axios.post('/api/v1/homeworks/comment', {
      work,
      comment
    })
    dispatch({ type: DELETE_MESSAGE, comment })
  }
}

export function completeHomework(first_name, work) {
  return (dispatch, getState) => {
    let { users } = getState().inform
    users = users.reduce((acc, rec) => {
      if (rec.first_name === first_name) {
        return [...acc, { ...rec, homeworks: work }]
      }
      return [...acc, rec]
    }, [])
    axios.post('/api/v1/homeworks/users', { first_name, work })
    dispatch({ type: COMPLETE_HOMEWORK, users })
  }
}
