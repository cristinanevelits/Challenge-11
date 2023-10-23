const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// API Routes
const notesRoutes = require('./routes/notesRoutes');
app.use('/api', notesRoutes);

// HTML Route to serve the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// HTML Route to serve the landing page or other pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});