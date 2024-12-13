const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// MongoDB connection URL and database setup
const mongoUri = "mongodb+srv://opennetworkglobal:YU0aAmLwy0QrbwO0@opennetwork.2wd60.mongodb.net/?retryWrites=true&w=majority&appName=OpenNetwork";
const dbName = "yourDatabaseName"; // Replace with your database name
const collectionName = "data"; // Using "data" as the collection name

// POST endpoint to receive data from ESP32
app.post('/pushData', async (req, res) => {
  const data = req.body;
  console.log('Received Data:', data);

  if (!data) {
    return res.status(400).send('Invalid data received');
  }

  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Ensure the document structure exists
    const filter = { "_id": "lastIrrigation" }; // Unique identifier for this document
    const update = {
      $set: {
        "lastIrrigation_data": data // Update the 'lastIrrigation_data' field with received data
      }
    };
    const options = { upsert: true }; // Create the document if it doesn't exist

    const result = await collection.updateOne(filter, update, options);
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);

    // Respond with a success message
    res.status(200).send('Data received and updated successfully');
  } catch (err) {
    console.error('Error interacting with MongoDB:', err);
    res.status(500).send('Failed to update data');
  } finally {
    if (client) {
      await client.close();
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
