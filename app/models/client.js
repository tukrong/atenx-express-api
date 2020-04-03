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

module.exports = mongoose.model('Client', clientSchema)
