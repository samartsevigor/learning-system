import mongoose from 'mongoose'

const homeworkSchema = new mongoose.Schema({
  work: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    unique: true,
    required: true
  },
  content: String,
  comments: {
    type: [Object],
    default: []
  },
  isUnlock: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('homeworks', homeworkSchema)
