const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  client: {
    fullname: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
}, {
  timestamps: true
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
