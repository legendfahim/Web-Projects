const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
