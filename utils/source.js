
const axios = require('axios');
const Stacktracey = require('stacktracey');
const { readFileSync } = require('fs');
const { resolve, join, sep } = require('path');
const { SourceMapConsumer } = require('source-map');

const httpReg = /^(http(s)?:)?\/\//;

const getSourceMap = async ({ path, project }) => {
  const isHttp = httpReg.test(path);
  let sourceMap;
  if (isHttp) {
    sourceMap = (await axios(path)).data;
  } else {
    const sourceMapText = readFileSync(resolve(`projects`, project, path), { encoding: 'utf-8' });
    sourceMap = JSON.parse(sourceMapText);
  }
  return sourceMap;
};

const path2HttpPath = (path = '') => {
  if (path.startsWith(sep)) path = path.replace(sep, '');
  return `http://${path.split(sep).join('/')}`;
}

const getMapPath = ({ fileName, basePath, project, versionHash }) => {
  const isHttpBasePath = httpReg.test(basePath);
  const mapFileName = `${fileName}.map`;
  let mapPath = basePath ? join(basePath, project, versionHash, 'js', mapFileName) : `${fileName}.map`;
  if (isHttpBasePath) mapPath = path2HttpPath(mapPath);
  console.log('fileName文件名字：\n', fileName);
  console.log('mapPath地址：\n', mapPath);
  return mapPath;
}

const getSourceInfos = async ({ stack, project, basePath, versionHash }) => {
  let sourceInfos = []
  const stacks = new Stacktracey(stack).items; // 解析错误信息

  for (const item of stacks) {
    const { file, line, column, fileName } = item;
    // 排除node_modules的堆栈：chunk-vendors可能包含非node_modules的公共模块,需检查vue-cli3的webpack配置
    if (file.includes('chunk-vendors')) continue;

    console.log("item:\n", item)

    const sourceMap = await getSourceMap({ path: getMapPath({ fileName, basePath, project, versionHash }), project });

    const sourceInfo = await SourceMapConsumer.with(sourceMap, null, consumer => {
      const _sourceInfo = consumer.originalPositionFor({ line, column });
      _sourceInfo.source = _sourceInfo.source.replace('webpack:///', '').replace(/\?.*$/, '');
      return _sourceInfo;
    });


    // 排除node_modules的堆栈：需要先请求每一个map文件拿到源文件，比较慢
    // if (sourceInfo.source.includes('node_modules')) continue;

    sourceInfos.push(sourceInfo)
  }
  return sourceInfos;

};

module.exports = { getSourceInfos };
