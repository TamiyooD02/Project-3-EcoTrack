//import express to create a router
import express from 'express';

//import ObjectId
import { ObjectId } from 'mongodb';

// import database connection
import { getDB } from '../db.js';

//create the router
const router = express.Router();

//CREATE - POSR /api/activities
// adds new activity to database
router.post('/', async (req, res) => {
  const db = getDB();
  const activity = req.body;
  const result = await db.collection('activities').insertOne(activity);
  res.json(result);
});

//READ - GET /api/activities
// gets all activities
router.get('/', async (req, res) => {
  const db = getDB();
  const filter = {};
  if (req.query.date) {
    filter.date = req.query.date;
  }

  const activities = await db.collection('activities').find(filter).toArray();
  res.json(activities);
});

//UPDATE - PUT /api/activities/:id
//updates one activity by its id
router.put('/:id', async (req, res) => {
  const db = getDB();

  //convert the id from a string to mongodb ObjectId
  const id = new ObjectId(req.params.id);
  const updatedActivity = req.body;

  const result = await db
    .collection('activities')
    .updateOne({ _id: id }, { $set: updatedActivity });
  res.json(result);
});

//DELETE - DELETE /api/activities/:id
// deletes activity by its id
router.delete('/:id', async (req, res) => {
  const db = getDB();

  //converts id from a string to mongodb ObjectId
  const id = new ObjectId(req.params.id);

  const result = await db.collection('activities').deleteOne({ _id: id });
  res.json(result);
});

// export router so index.js can use it
export default router;
