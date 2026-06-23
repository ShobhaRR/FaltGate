require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    res.json({
      success: true,
      message: "Login successful"
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});

app.get("/login", (req, res) => {
  res.send("Login API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});