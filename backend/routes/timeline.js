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

// Timeline route
router.get('/', verifyToken, (req, res) => {
  try {
    // Fetch all snaps from the database
    db.query('SELECT * FROM snaps ORDER BY created_at DESC', (err, snaps) => {
      if (err) {
        throw err;
      }

      res.status(200).json({ snaps });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
