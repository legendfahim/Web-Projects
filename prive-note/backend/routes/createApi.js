const express = require("express");
const createRouter = express.Router();
const noteSchema = require("../models/noteSchema");

createRouter.post("/create-note", async (req, res) => {
  //Get data from Request body
  const { note, name, password } = req.body;

  try {
    // Check Note name already exist or not
    const existingNote = await noteSchema.findOne({ name: name });
    if (existingNote) {
      return res.json({ message: "Note already exists" });
    }
    //Note Created
    const newNote = new noteSchema({
      note,
      name,
      password,
    });
    //Note Saved
    await newNote.save();
    res.json({ message: "Note created" });
  } catch (error) {
    //Get error response
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = createRouter;
