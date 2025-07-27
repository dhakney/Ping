const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const timelineRoutes = require('./routes/timeline');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/timeline', timelineRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
