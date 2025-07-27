const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ping'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Profile route
router.get('/:userId', verifyToken, (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user data from the database
    db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];

      // Fetch user's snaps from the database
      db.query('SELECT * FROM snaps WHERE user_id = ?', [userId], (err, snaps) => {
        if (err) {
          throw err;
        }

        res.status(200).json({ user, snaps });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
