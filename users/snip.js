const contact = ['firstName', 'lastName', 'email', 'username'];
const o = { username: 'a', firstName: 'b', password: 'c', role: 'admin', email: 'd' };

let update = {};
let keys = Object.keys(o)
for (let i = 0; i < keys.length; i++) {
  const key = keys[i]
  if (contact.indexOf(key) > -1) {
    update[`contact.${key}`] = o[key]

    continue;
  }

  update[key] = o[key];
}

console.log(update)

// const updateNestedObjectParser = (nestedUpdateObject) => {
//   const final = {

//   }
//   Object.keys(nestedUpdateObject).forEach(k => {
//     if (typeof nestedUpdateObject[k] === 'object' && !Array.isArray(nestedUpdateObject[k])) {
//       const res = updateNestedObjectParser(nestedUpdateObject[k])
//       Object.keys(res).forEach(a => {
//         final[`${k}.${a}`] = res[a]
//       })
//     }
//     else
//       final[k] = nestedUpdateObject[k]
//   })
//   console.log(final)
//   return final
// }

// updateNestedObjectParser(o);