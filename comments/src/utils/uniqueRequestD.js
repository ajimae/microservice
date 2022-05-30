const { v4: uuidv4 } = require('uuid');

function generateID(_request) {
  return uuidv4();
}

module.exports = function({
  setHeader = true,
  generator = generateID,
  attributeName = 'id',
  headerName = 'X-Request-Id',
} = {}) {
  return function (request, response, next) {
    const oldValue = request.get(headerName);
    // const id = oldValue === undefined ? generator(request) : oldValue;
    const id = oldValue || generator(request)

    if (setHeader) {
      response.set(headerName, id);
    }

    request[attributeName] = id;
    next();
  };
}
