const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }, // dusre object ke modal ID {foreign key}
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "Genera;" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", NoteSchema);
