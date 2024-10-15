import User from './models/user';
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const dburl: string = process.env.dburl || '';


async function connectToMongo(dburl: string) {
    const retryAttempts = 3;
    const connectTimeoutMS = 20000;
  
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        await mongoose.connect(dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectTimeoutMS,
        });
        console.log('Connected to Database');
        return;
      } catch (error: any) {
        console.error(`Connection attempt ${attempt} failed:`, error.message);
  
        await new Promise((resolve) =>
          setTimeout(resolve, Math.min(attempt * 2000, 10000))
        );
      }
    }
}  

connectToMongo(dburl)
.then(async () => {
  console.log('Connected to MongoDB');
  await User.updateMany(
    {},
    {
      $set: {
        newField1: "defaultValue1",
        newField2: 0,
        // Set other new fields with their default values here
      },
    }
  );
})
