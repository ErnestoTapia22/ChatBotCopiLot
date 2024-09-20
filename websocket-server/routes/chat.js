// routes/chat.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Secure chat room access
router.get('/chatroom', auth, (req, res) => {
  res.json({ message: 'Welcome to the chat room' });
});

module.exports = router;
