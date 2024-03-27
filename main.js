// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const app = express();
const port = 3000; // You can use any port you prefer


//cors implementation
// app.use(cors);
app.use(cors({
  origin: "*"
}))
// Set up middleware for parsing JSON body
app.use(bodyParser.json());

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI("AIzaSyD9fRt4Hu4GXbikE993jjnwgYvMzkmbcUw");


app.post('/askAI', async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
