const { readFileSync } = require('fs');
const { resolve, join, sep } = require('path');

const yarnLockText = readFileSync(resolve('./yarn.lock'), { encoding: 'utf-8' });


const parseYarnLock = ({ packageName = '' } = {}) => {
  const reg = new RegExp(`(?<=(${packageName}@.+:)[\s\n]*version ").*(?=")`, 'g');
  // const reg = /(?<=(^vue@.+:)[\s\S]*version ").*(?=")/

  const version = yarnLockText.match(reg);
  console.log(reg);
  console.log(version)
}

parseYarnLock({ packageName: 'vue' })