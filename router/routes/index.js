
const errorReport = require('./errorReport');
const getStackSource = require('./getStackSource');

const routes = {
  ...errorReport,
  ...getStackSource
};

module.exports = routes;
