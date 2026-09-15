const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title cannot be blank").isLength({ min: 5 }),
    body(
      "description",
      "Description must be at least 5 characters long",
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

//ROUTE3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),

    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { title, description, tag } = req.body;

      const newNote = {};

      if (title) {
        newNote.title = title;
      }

      if (description) {
        newNote.description = description;
      }

      if (tag !== undefined) {
        newNote.tag = tag;
      }

      let note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found",
        });
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Not Allowed",
        });
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { returnDocument: "after" },
      );

      res.json(note);
    } catch (error) {
      console.error("Update note error:", error.message);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
);

//ROUTE4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note deleted successfully", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
