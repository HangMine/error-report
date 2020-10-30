const { spawnSync } = require('child_process');
const { resolve } = require('path')
const axios = require('axios');
const gitAxios = axios.create({
  baseURL: 'http://gitlab.4dshoetech.local/api/v4/',
  headers: { 'PRIVATE-TOKEN': 'G_Z2YE9hAkLFzqsWVyS4' }
})

const project2Id = {
  'art': 7,
  'material-admin': 84,
}

const getMaintainers = async ({ project, ref }) => {
  const projectId = project2Id[project];
  const filePath = 'package.json';
  const content = (await gitAxios(`/projects/${projectId}/repository/files/${filePath}/raw`, { params: { ref } })).data;
  return content.maintainers;
}

const getCommiterInfo = async ({ project, ref, commiter, type }) => {
  const maintainers = await getMaintainers({ project, ref })
  const maintainer = maintainers.find(item => item.name === commiter) || {};
  return maintainer[type] || ''
}

const getGitInfo = async ({ project, ref, file, line }) => {
  const gitExec = (args = [], options = {}) => {
    const subProcess = spawnSync('git', args, { cwd: `projects/${project}`, encoding: 'utf-8', ...options });
    return subProcess.stdout;
  }
  gitExec(['checkout', ref])
  gitExec(['pull', 'origin', ref])
  const blames = gitExec(['blame', '-L', line, file]);
  const rowArr = blames.split('\n') || [];
  const row = rowArr[0] || '';
  const commitId = row.slice(0, 10) || '';
  const matches = row.match(/(?<=\().*?(?=\))/)
  const commiter = matches && matches[0].split(' ')[0] || '';
  const commiterEmail = await getCommiterInfo({ project, ref, commiter, type: 'email' });

  return {
    line,
    commitId,
    commiter,
    commiterEmail,
    row
  }

}


module.exports = { getGitInfo };