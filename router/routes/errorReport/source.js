
const axios = require('axios')
const Stacktracey = require('stacktracey');
const sourceMap = require('source-map');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { SourceMapConsumer } = sourceMap;


const getSourceMap = async ({ path, project, type = "axios" }) => {
  let sourceMap;
  if (type === 'local') {
    path = resolve(`projects`, project, path);
    const sourceMapText = readFileSync(path, { encoding: 'utf-8' });
    sourceMap = JSON.parse(sourceMapText);
  } else {
    sourceMap = (await axios(path)).data;
  }
  return sourceMap;
};

const getSourceInfos = async ({ stack, project }) => {
  let sourceInfos = []
  const stacks = new Stacktracey(stack).items; // 解析错误信息

  for (const item of stacks) {
    const { file, line, column } = item;
    // 排除node_modules的堆栈：chunk-vendors可能包含非node_modules的公共模块,需检查vue-cli3的webpack配置
    if (file.includes('chunk-vendors')) continue;

    const sourceMap = await getSourceMap({ path: `${file}.map`, project });
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
