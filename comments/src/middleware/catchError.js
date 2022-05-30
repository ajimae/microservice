/**
 * Catches errors thrown in controllers
 * @param {Function} fn - The controller function
 */

// const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);
function catchErrors(fn) {
  return function (req, res, next) {
    console.log(next);
    fn(req, res, next)
    .catch(next)
  }
}

module.exports = catchErrors;
