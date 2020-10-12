
const https = require('https')
const axios = require('axios');
const { getSourceInfos } = require('./utils/source');



const getStackSource = async (serverLog = {}) => {

  // ref默认master
  const { stack, project = 'demon-home', ref = "master", env, } = serverLog;
  const sourceInfos = await getSourceInfos({ stack, project });

  const originStackArr = stack.split('\n');
  let sourceStackArr = [originStackArr[0]];
  let markdownStackArr = [originStackArr[0]];

  // 根据原stack映射出source的stack
  sourceInfos.forEach((item, i) => {
    const { source, line, column } = item;
    const originRow = originStackArr[i + 1] || '';
    const gitLabUrl = `http://gitlab.4dshoetech.local/front-end/${project}/blob/${ref}/${source}#L${line}`
    const newRow = originRow.replace(/\(.*\)/, `(${source}:${line}:${column})`);
    sourceStackArr.push(newRow);
    const markdownRow = originRow.replace(/\(.*\)/, `([${source}:${line}:${column}](${gitLabUrl}))`);
    markdownStackArr.push(markdownRow)
  })

  const sourceStack = sourceStackArr.join('\n');
  const textTitles = [
    '[测试]前端告警',
    `[项目]${project}`,
    `[环境]${env}`,
  ].map(item => `### ${item}\n`)

  const markdown = {
    title: "测试标题",
    text: `${textTitles.join('')} >${markdownStackArr.join('\n')}`
  }


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


const main = async () => {
  try {
    if (!process.argv[2]) {
      throw Error('参数为空')
    }
    const params = JSON.parse(process.argv[2]);
    const output = await Promise.all(params.map(item => getStackSource(item)))
    console.log(output);

    // output.forEach(item => notifyError(item.markdown))

  } catch (error) {
    console.error(error);
  }
}

main()
