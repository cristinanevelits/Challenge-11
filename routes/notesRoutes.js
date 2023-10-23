const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Read notes from a JSON file
router.get('/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), 'utf8'));
  res.json(notesData);
});

// Create a new note
router.post('/notes', (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };
  
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), 'utf8'));
  notesData.push(newNote);
  
  fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

// DELETE /api/notes/:id
router.delete('/notes/:id', (req, res) => {
  const noteIdToDelete = req.params.id;
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), 'utf8'));
  const indexToDelete = notesData.findIndex(note => note.id === noteIdToDelete);
  
  if (indexToDelete === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notesData.splice(indexToDelete, 1);
  fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notesData, null, 2));
  res.json({ message: 'Note deleted' });
});

module.exports = router;