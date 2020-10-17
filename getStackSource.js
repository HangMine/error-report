
const https = require('https');
const axios = require('axios');
const { getSourceInfos } = require('./utils/source');

const getGitProjectName = (project) => {
  const projectMap = {
    art: 'demon-home',
    'material-admin': 'material-admin',
    opt: 'opt',
  }
  return projectMap[project] || 'art'
}


const handleParams = async (serverLog = {}, basePath = '') => {

  // ref默认master
  const { stack, project = 'art', ref = "master", env, versionHash } = serverLog;
  const sourceInfos = await getSourceInfos({ stack, project, basePath, versionHash });

  const originStackArr = stack.split('\n');
  let sourceStackArr = [];
  let markdownStackArr = [];

  // 根据原stack映射出source的stack
  sourceInfos.forEach(item => {
    const { source, line, column, stackLine } = item;
    const originRow = originStackArr[+stackLine + 1] || '';
    const gitLabUrl = `http://gitlab.4dshoetech.local/front-end/${getGitProjectName(project)}/blob/${ref}/${source}#L${line}`;
    const httpReg = /http(s)?:\/\/.*(\\n|(?=\)))?/;
    const sourceRow = originRow.replace(httpReg, `${source}:${line}:${column}`);
    sourceStackArr.push(sourceRow);
    const markdownRow = originRow.replace(httpReg, `[${source}:${line}:${column}](${gitLabUrl})`);
    markdownStackArr.push(markdownRow);
  })

  const sourceStack = sourceStackArr.join('\n');
  const textTitles = [
    `### 前端告警: ${originStackArr[0]}`,
    `**项目:** ${project}`,
    `**环境:** ${env}`,
  ];

  const markdown = {
    title: "前端告警",
    text: `${textTitles.map(title => `${title} \n\n`).join('')} ${markdownStackArr.map(row => `- ${row}\n\n`).join('')}`
  };

  return {
    ...serverLog,
    sourceInfos,
    sourceStack,
    markdown
  }
}

const notifyError = (markdown) => {
  try {
    axios({
      url: 'https://oapi.dingtalk.com/robot/send?access_token=821ba73676cb87501fb2051cb25bec5484e0fba0193a9baa0c0bea1c6af60c54',
      method: 'post',
      // 为了忽略https证书错误
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        msgtype: "markdown",
        markdown
      }
    })
    console.log('--------报警成功----------')
  } catch (error) {
    console.error('--------报警失败----------');
    console.error(error)
  }

}


const getStackSource = async () => {
  try {
    if (!process.argv[2]) {
      throw Error('参数为空')
    }
    const params = JSON.parse(process.argv[2]);
    const basePath = process.argv[3];
    const addedSourceParams = await Promise.all(params.map(item => handleParams(item, basePath)));
    const output = JSON.stringify(addedSourceParams);
    // addedSourceParams.forEach(item => notifyError(item.markdown));
    console.log(output)
  } catch (error) {
    console.log('获取堆栈源信息失败：\n', error)
  }
}

getStackSource()
