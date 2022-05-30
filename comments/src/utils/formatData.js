module.exports = (data) => {
  let update = {};
  let keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    update[key] = data[key];
  }

  return update;
}
