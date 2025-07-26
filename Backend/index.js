import express from 'express';
import connectDB from './config/db.js'
import signinsignup from './routes/signin&signuplogout.js'
import activityLogger from './routes/Activitylogger.js';
import ipratemonitor from './routes/iprateMonitor.js'
import cors from 'cors';
import FakeData from './routes/Fakedata.js'
const port  =5500;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json()); //for parsing json bodies
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/',signinsignup)
app.use(ipratemonitor)
app.use(activityLogger)
app.get('/', (req, res) => {
  res.send('Welcome to the our API!');
});
app.use(FakeData)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
