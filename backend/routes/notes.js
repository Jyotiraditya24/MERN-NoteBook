const express = require("express");
const router = express.Router();
const fetchUserMiddleWare = require("../middleware/fetchUserMiddleWare");
const Note = require("../models/Notes.js");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using GET:"/api/notes/fetchAllNotes"

router.get("/fetchAllNotes", fetchUserMiddleWare, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }); //.find() always taken an object
  res.json(notes);
});

// ROUTE 2: Add a new note using POST:"/api/notes/addNote"

router.post(
  "/addNote",
  fetchUserMiddleWare,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "It should have at least 5 characters").isLength({
      min: 5,
    }),
    body(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update a new note using POST:"/api/notes/updateNote"
router.post("/updateNote/:id", fetchUserMiddleWare, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete a Note using
router.delete("/deleteNote/:id", fetchUserMiddleWare, async (req, res) => {
  try {
    let noteToBeDeleted = await Note.findById(req.params.id);
    if (!noteToBeDeleted) {
      return res.status(404).send("Not Found");
    }

    if (noteToBeDeleted.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    noteToBeDeleted = await Note.deleteOne({ _id: req.params.id });
    res.json({ noteToBeDeleted });
  } catch (err) {  
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
