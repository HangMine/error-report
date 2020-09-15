const axios = require('axios');

const jiraAxios = axios.create({
  baseURL: 'http://jira.4dshoetech.local:8080/rest/api/2/',
  headers: { 'Authorization': `Basic ${Buffer.from('zhenghf@4dstc.com:Hello123').toString('base64')}` }
})

const projectKeyMap = {
  'demon-home': 'IDEATION'
}

const json2Table = (json) => {
  let strArr = [];
  for (const [key, value] of Object.entries(json)) {
    const str = `||${key}|${(typeof value === 'object' && JSON.stringify(value, null, 2)) || value}|`;
    strArr.push(str);
  }
  return strArr.join('\n')
}

const json2Code = (json) => {
  return `
  {code:javascript}
  // stack相关信息(已排除node_modules的堆栈)
  ${JSON.stringify(json, null, '\t')}
  {code}
  `
}

const getDescription = ({ errorMd5, serverLog, project, ref, stackInfos }) => {
  const reportJiraItem = stackInfos[0];
  const sourcePath = reportJiraItem.sourceInfo.source || '';
  const tableDes = json2Table({
    MD5: errorMd5,
    ...serverLog,
    'gitLab地址': ` http://gitlab.4dshoetech.local/front-end/${project}/blob/${ref}/${sourcePath}`
  });
  const stackDes = json2Code(stackInfos);
  const description = `${tableDes}\n${stackDes}`;
  return description;
}

const postJira = async ({ project, ref, stackInfos = [], errorMd5, serverLog = {} } = {}) => {
  const projectKey = projectKeyMap[project];
  const reportJiraItem = stackInfos[0];
  const commiterEmail = reportJiraItem.gitInfo.commiterEmail || '';
  const { message } = serverLog;

  const params = {
    fields: {
      project: { key: projectKey },
      summary: `[前端自动报错] ${message}`,
      description: getDescription({ errorMd5, serverLog, project, ref, stackInfos }),
      issuetype: { name: "bug" },
      assignee: { name: commiterEmail }
    }
  }
  const { data } = await jiraAxios({ url: 'issue', method: 'post', data: params });
  return data;
}

const checkJira = async (md5) => {
  const { data = {} } = await jiraAxios({ url: 'search', params: { jql: `description ~ ${md5}` } });
  return !!data.total;
}

module.exports = { postJira, checkJira };