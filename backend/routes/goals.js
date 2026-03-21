//import express to create a router
import express from 'express';

//import ObjectId
import { ObjectId } from 'mongodb';

// import database connection
import { getDB } from '../db.js';

//create the router
const router = express.Router();

// adds new goal to database
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const goal = req.body;
    const result = await db.collection('goals').insertOne(goal);
    res.json(result);
  } catch {
    res.status(500).json({ message: 'Error creating goal' });
  }
});

// gets all goals
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // get goals from database
    const goals = await db.collection('goals').find(filter).toArray();

    res.json(goals);
  } catch {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

//updates one goal by its id
router.put('/:id', async (req, res) => {
  try {
    const db = getDB();

    //convert the id from a string to mongodb ObjectId
    const id = new ObjectId(req.params.id);
    const updatedGoal = req.body;

    const result = await db
      .collection('goals')
      .updateOne({ _id: id }, { $set: updatedGoal });
    res.json(result);
  } catch {
    res.status(500).json({ message: 'Error updating goal' });
  }
});

// deletes goal by its id
router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();

    //converts id from a string to mongodb ObjectId
    const id = new ObjectId(req.params.id);

    const result = await db.collection('goals').deleteOne({ _id: id });
    res.json(result);
  } catch {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

// export router so index.js can use it
export default router;
