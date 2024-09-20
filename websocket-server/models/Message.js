

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  id: { type: Number, required: false , unique: true , value: new Date().getTime() },
  user: { type: String, required: true },
  message: { type: String, required: true },
  room: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);
