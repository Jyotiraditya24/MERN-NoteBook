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



module.exports = router;
