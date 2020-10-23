
const md5 = require('js-md5');

const getErrorMd5 = (serverLog = {}) => {
  const { stack, project = 'art', ref = 'master', env, versionHash } = serverLog;
  const errorMd5 = md5(`${project}${ref}${env}${stack}`);
  return errorMd5;
}

module.exports = { getErrorMd5 }