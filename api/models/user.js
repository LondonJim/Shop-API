const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true) // fix: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  role: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true}
})

module.exports = mongoose.model('User', userSchema)
