import mongoose from 'mongoose'

exports.connect = (mongoURL) => {
  mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
}

mongoose.connection.on('error', () => {
  // eslint-disable-next-line no-console
  console.log('Connection failed')
})
mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB is connected')
})
