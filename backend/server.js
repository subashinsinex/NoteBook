const express = require("express");
const app = express();
const notes = require("./data/notes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api is running..");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
