import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import { Request, Response } from 'express';
import { githubContributionsHandler } from './api/github-contributions.js';

import mongoose from 'mongoose';
import { subscribeHandler } from './api/newsletter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allowedOrigins = [process.env.URL, "https://ccf7-117-98-192-189.ngrok-free.app"].filter((origin): origin is string => !!origin);

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Hello World!');
});

// GitHub contributions API endpoint
app.get('/api/github-contributions/:username', githubContributionsHandler);

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', subscribeHandler);

// Intro Call API endpoint
import { createIntroCallHandler } from './api/intro-call.js';
app.post('/api/intro-call', createIntroCallHandler);


app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.status(404).json({ message: "Not Found Router" });
});

app.get(/(.*)/, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
