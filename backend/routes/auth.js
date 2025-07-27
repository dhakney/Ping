const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

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

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      username,
      password: hashedPassword,
      email
    };

    // Insert the new user into the database
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Compare the passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
