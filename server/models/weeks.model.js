import mongoose from 'mongoose'

const weekSchema = new mongoose.Schema({
  week: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  isUnlock: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('weeks', weekSchema)
