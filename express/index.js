require('dotenv').config();
const dbURI = process.env.mongoURL;
console.log(dbURI);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Define a MongoDB schema and model
const DataSchema = new mongoose.Schema({ message: String });
const DataModel = mongoose.model('Data', DataSchema);

// SSE Route
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a comment every 5 seconds to keep connection alive (heartbeat)
  const intervalId = setInterval(() => {
    res.write(':heartbeat\n\n');
  }, 5000);

  // Watch MongoDB collection for changes
  const changeStream = DataModel.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const newData = change.fullDocument;
      res.write(`data: ${JSON.stringify(newData)}\n\n`);
    }
  });

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    changeStream.close();
    res.end();
  });
});

// Route to create new data
app.post('/add-data', async (req, res) => {
  const { message } = req.body;
  const newData = new DataModel({ message: message ?? 'hello' });
  await newData.save();
  res.json(newData);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
