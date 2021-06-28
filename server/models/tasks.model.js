import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  week: {
    type: Number
  },
  description: {
    type: String
  },
  name: {
    type: String
  },
  date: {
    type: Number
  },
  content: String,
  isUnlock: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('tasks', taskSchema)
