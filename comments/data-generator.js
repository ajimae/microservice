const Chance = require('chance');
const data = require('./migration/data.json');
const mongoose = require('mongoose');

const chance = new Chance();


function generateNames(size) {
  let names = [];
  const length = generateRandom(size);
  for (let i = 0; i < length; i++) {
    names.push(chance.name());
  }

  return names;
}

function generateRandom(max, min = 5) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateData() {
  const _data = [];
  for (let i = 0; i < data.length; i++) {
    if (!data[i].hashTags.length) {
      const hashTags = generateNames(30);
      data[i].hashTags = hashTags;
    }

    if (!data[i].mentions.length) {
      const mentions = generateNames(30);
      data[i].mentions = mentions;
    }

    data[i].userId = new mongoose.Types.ObjectId();
    _data.push(data[i]);
  }

  return data;

}

console.log(JSON.stringify(generateData()));
