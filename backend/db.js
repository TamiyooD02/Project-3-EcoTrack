//import mongodb library
import { MongoClient } from 'mongodb';

//load the .env file
import dotenv from 'dotenv';
dotenv.config();

//connection string
const uri = process.env.MONGO_URI;

//create new mongodb client
const client = new MongoClient(uri);

//connect to mongodb and export the database
let db;

async function connectDB() {
  await client.connect();
  db = client.db('ecotrack');
  console.log('Connected to MongoDB');
}

// function that gets database from other files
function getDB() {
  return db;
}

export { connectDB, getDB };
