const express = require('express');
const router = express.Router();
const Message = require('./models/Message'); // Assuming you have a Message model
const User = require('./models/User'); // Assuming you have a User model

// Search endpoint
router.get('/search', async (req, res) => {
  const { query, room } = req.query;

  try {
    // Search messages within the specified room
    const messages = await Message.find({
      $text: { $search: query },
      room: room
    });

    // Search users
    const users = await User.find({
      $text: { $search: query }
    });

    res.json({ messages, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
