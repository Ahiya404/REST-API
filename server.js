const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use("/api", todoRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to To-Do List API!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
