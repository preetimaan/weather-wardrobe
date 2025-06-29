const express = require('express');
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
