// import dotenv first
import dotenv from 'dotenv';
dotenv.config();

// import express library
import express from 'express';

import session from 'express-session';

// import  passport config
import passport from './config/passportConfig.js';

// import  database connection function
import { connectDB } from './db.js';

// import routes
import activitiesRouter from './routes/activities.js';
import goalsRouter from './routes/goals.js';
import authRouter from './routes/auth.js';

// create the server app
const app = express();

// lets the server read JSON data from the frontend
app.use(express.json());

// set up sessions so users stay logged in between requests
// the secret is used to sign the session cookie to keep it secure
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // session expires after 1 day
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// set up passport to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// connect the routes
app.use('/api/activities', activitiesRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/auth', authRouter);

// test route to see if server is working
app.get('/api/ping', (req, res) => {
  res.json({ ok: true });
});

// connect to mongodb first then start the server
connectDB().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
