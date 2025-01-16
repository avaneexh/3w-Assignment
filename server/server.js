import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import submissionRoutes from './routes/submissionRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS, // Allow all origins if CORS=*
  })
);
app.use(bodyParser.json({ limit: '10mb' })); // For large images
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/submissions', submissionRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
