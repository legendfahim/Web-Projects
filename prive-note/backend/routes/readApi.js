const express = require("express");
const readRouter = express.Router();
const noteSchema = require("../models/noteSchema");
readRouter.post("/read-note", async (req, res) => {
  const { name, password } = req.body;
  try {
    let check = await noteSchema.findOne({ name, password });
    //check is the note object
    if (check) {
      const responseData = {
        note: check.note,
        name: check.name,
        createdAt: check.createdAt,
      };
      // console.log(responseData)
      res.status(200).json(responseData);
    } else {
      res.status(404).json({
        message: "Note not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = readRouter;
