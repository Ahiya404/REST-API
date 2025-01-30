const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("To-Do API is working!");
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
