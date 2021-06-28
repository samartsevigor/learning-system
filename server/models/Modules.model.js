import mongoose from 'mongoose'

const modulesSchema = new mongoose.Schema({
  module: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  date: {
    type: Number,
    required: true,
    unique: true
  }
})

export default mongoose.model('modules', modulesSchema)
