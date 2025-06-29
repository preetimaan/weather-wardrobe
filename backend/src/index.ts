import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import wardrobeRoutes from './routes/wardrobe';

const app = express();
const port = process.env.PORT || 3000;

// Debug: Log environment variables on startup
console.log('Server startup - Environment variables:', {
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY ? 'SET' : 'NOT SET',
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

// CORS middleware to allow frontend requests
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'], // Allow frontend dev and production
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use('/api', weatherRoutes);
app.use('/api', wardrobeRoutes);

// Debug route to check environment variables
app.get('/debug', (req: Request, res: Response) => {
  res.json({
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV
  });
});

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
