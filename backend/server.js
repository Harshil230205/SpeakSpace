const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// Add your API routes here
// Example: app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
