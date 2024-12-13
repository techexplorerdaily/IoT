const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB Connection
const uri = "mongodb+srv://opennetworkglobal:YU0aAmLwy0QrbwO0@opennetwork.2wd60.mongodb.net/?retryWrites=true&w=majority&appName=OpenNetwork";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('Data', DataSchema);

// Express App Setup
const app = express();
app.use(bodyParser.json());

// API Endpoint to Push JSON Data
app.post('/pushData', async (req, res) => {
  try {
    const data = new DataModel(req.body);
    await data.save();
    res.status(200).send('Data saved successfully!');
  } catch (err) {
    res.status(500).send('Error saving data: ' + err.message);
  }
});

// Start the Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
