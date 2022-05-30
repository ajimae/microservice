const data = require('./data.json');
const config = require('../src/config');
const Database = require('../src/db');
const Driver = require('../src/models');
const mongoose = require('mongoose');

const database = new Database(mongoose, { ...config, mongooseDebugMode: false });

let done = 0;
database.connect().then(async () => {
  await Driver.deleteMany({})
  for (let i = 0; i < data.length; i++) {
    await Driver({ ...data[i] }).save();
    ++done;
  }
})
  .then(() => {
    console.log(`${done} mock data seeded from seed script.`);
    process.exit(0);
  })
  .catch(console.error);
