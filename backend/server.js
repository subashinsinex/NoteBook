const express = require("express");
const app = express();
const notes = require("./data/notes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

// Load environment variables and setup MongoDB connection
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if not specified
const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
