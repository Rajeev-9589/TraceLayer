import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import {
  RegisterasDev,
  getAllActivity,
  iprateMonitormodel,
  DevLogin,fakeapi,
  tracelayerlogin,
  limitsetter,
} from './index.js';

const app = express();
const PORT = 5500;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/', RegisterasDev);
app.use('/api/', getAllActivity);
app.use('/api/protected', iprateMonitormodel);
app.use('/api/', DevLogin);
app.use('/api/protected', fakeapi);
app.use('/api',tracelayerlogin)
app.use('/tracelayer',limitsetter)

// check
app.get('/', (req, res) => {
  res.send('Hello from App using TraceLayer ');
});

// Start server
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
