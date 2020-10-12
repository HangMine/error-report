
const md5 = require('js-md5');
const { getParams, check, uploader } = require('../../../common');
const { getSourceInfos } = require('../../../utils/source');
const { getGitInfo } = require('../../../utils/git');
const { postJira, checkJira } = require('../../../utils/jira');
const { jenkins } = require('../../../utils/jenkins');

const main = async ({ serverLog, project, ref }) => {
  const { stack } = serverLog;
  // md5加上项目名,因为检查md5值是全局搜索description
  const errorMd5 = md5(`${project} ${stack}`);
  if (await checkJira(errorMd5)) {
    return {
      code: '-2',
      error: { project, stack, md5: errorMd5 },
      msg: '重复错误不上报'
    };
  }

  const sourceInfos = await getSourceInfos({ stack, project });
  const stackInfos = sourceInfos.map(item => ({
    sourceInfo: item,
    gitInfo: getGitInfo({ project, ref, file: item.source, line: item.line })
  }));
  const jiraInfo = await postJira({ project, ref, stackInfos, errorMd5, serverLog });
  const response = {
    code: '0',
    data: { stackInfos, jiraInfo },
    msg: '错误上报成功'
  }
  return response
}

const errorReport = async (req, res) => {
  const { serverLog = {}, project = 'demon-home', ref } = getParams(req);
  try {
    const response = await main({ serverLog, project, ref });
    console.log(response)
    res.send(response)
  } catch (error) {
    console.error(error)
    res.send({
      code: '-1',
      error: error.stack,
      msg: '错误上报失败'
    })
  }
}


module.exports = {
  '/errorReport': errorReport,
};