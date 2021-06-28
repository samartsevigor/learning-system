import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    default: ['user']
  },
  score: {
    type: Number,
    default: 1,
    required: true
  },
  homeworks: {
    type: [Number],
    default: []
  },
  modules: {
    type: Object,
    default: {}
  }
})

userSchema.pre('save', function hashPassword() {
  this.password = bcrypt.hashSync(this.password)
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ first_name, password }) {
    if (!first_name) {
      throw new Error('Enter user name')
    }
    if (!password) {
      throw new Error('Enter password')
    }
    const user = await this.findOne({ first_name })
    if (!user) {
      throw new Error('no user')
    }
    const isPasswordOk = await user.passwordMatches(password)
    if (!isPasswordOk) {
      throw new Error('incorrect password')
    }
    return user
  }
}

export default mongoose.model('users', userSchema)
