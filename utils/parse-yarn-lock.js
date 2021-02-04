
const { readFileSync } = require('fs');
const { resolve, join, sep } = require('path');

const getYarnLockPath = ({ basePath, project, versionHash }) => {
  let yarnLockPath = join(basePath, project, versionHash, 'js/yarn.lock');
  return yarnLockPath;
}

const getYarnLockText = ({ basePath, project, versionHash }) => {
  const path = getYarnLockPath({ basePath, project, versionHash })
  const yarnLockText = readFileSync(resolve(`projects`, project, path), { encoding: 'utf-8' });
  return yarnLockText
};

const getPackageInfo = (sourcePath) => {
  const arr = sourcePath.split('/');
  const [, packageName, ...packagePath] = arr;
  return {
    packageName, packagePath: packagePath.join('/')
  }
}

const getPackageVersion = ({ sourcePath, basePath, project, versionHash } = {}) => {
  try {
    const { packageName } = getPackageInfo(sourcePath);
    const yarnLockText = getYarnLockText({ basePath, project, versionHash })
    const reg = new RegExp(`(?<=([\\s|\\b]${packageName}@.+:)[\\s\\n]*version ").*(?=")`, 'g');
    const version = yarnLockText.match(reg);
    return Array.isArray(version) ? version[0] : version
  } catch (error) {
    // 兼容没有yarn.lock的情况
    return null;
  }
}

module.exports = {
  getYarnLockPath,
  getYarnLockText,
  getPackageInfo,
  getPackageVersion
}