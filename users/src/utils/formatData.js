module.exports = (data) => {
  let update = {};
  let keys = Object.keys(data);
  const contact = ['firstName', 'lastName', 'email', 'username'];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (contact.indexOf(key) > -1) {
      update[`contact.${key}`] = data[key];

      continue;
    }

    update[key] = data[key];
  }

  return update;
}
