const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
