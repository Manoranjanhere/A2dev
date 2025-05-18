import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/a2developers')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const demoRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  institutionName: {
    type: String,
    required: true
  },
  requirements: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);

app.post('/api/submit-demo-request', async (req, res) => {
  try {
    const newRequest = new DemoRequest(req.body);
    await newRequest.save();
    res.status(201).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving demo request:', error);
    res.status(500).json({ success: false, message: 'Failed to submit form' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
// Add this route to your server.js
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});