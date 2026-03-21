// adds fake data to database
// runs with: node seed.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
dotenv.config();

//read files from data folder and extracts contents
const transportData = JSON.parse(
  readFileSync('./data/transport.json', 'utf-8'),
);
const dietData = JSON.parse(readFileSync('./data/diet.json', 'utf-8'));
const energyData = JSON.parse(readFileSync('./data/energy.json', 'utf-8'));
const goalsData = JSON.parse(readFileSync('./data/goals.json', 'utf-8'));

//connect to mongodb
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db('ecotrack');

//delete old data so there are no duplicates
await db
  .collection('activities')
  .drop()
  .catch(() => {
    console.log('collection does not exist yet');
  });

//combine all three files
const allActivities = [...transportData, ...dietData, ...energyData];

//insert everything into activities collection
await db.collection('activities').insertMany(allActivities);
console.log('inserted ' + allActivities.length + ' activities!');

//delete old goals data so there are no duplicates
await db
  .collection('goals')
  .drop()
  .catch(() => {
    console.log('goals collection does not exist yet');
  });

//insert goals into goals collection
await db.collection('goals').insertMany(goalsData);
console.log('inserted ' + goalsData.length + ' goals!');

// disconnect from mongodb
await client.close();
