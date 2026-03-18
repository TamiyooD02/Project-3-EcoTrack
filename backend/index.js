//import dotenv
import dotenv from 'dotenv';
dotenv.config();

//import express library
import express from 'express';

//import database connection function
import { connectDB } from './db.js';
import activitiesRouter from './routes/activities.js';

//create server app
const app = express();

//lets the server read JSON data from frontend
app.use(express.json());

//connect activities routes
app.use('/api/activities', activitiesRouter);

//test route to see if server is working
app.get('/api/ping', (req, res) => {
  res.json({ ok: true });
});

//connect to mongodb first then start the server
connectDB().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
