const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// POST endpoint to receive data from ESP32
app.post('/pushData', (req, res) => {
  const data = req.body;
  console.log('Received Data:', data);

  // Process the data or save it to MongoDB here

  // Respond with a success message
  res.status(200).send('Data received successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
