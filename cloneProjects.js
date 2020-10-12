const { spawnSync } = require('child_process');
const { spawnPromise } = require('./common');

const projectsMap = {
  ['demon-home']: 'git@192.168.19.2:front-end/demon-home.git',
  ['anta-admin']: 'git@192.168.19.2:front-end/anta-admin.git',
  ['operation-admin']: 'git@192.168.19.2:front-end/operation-admin.git',
}

const clone = (projects = []) => {
  return projects.map(([project, gitUrl]) => spawnPromise('git', ['clone', gitUrl], { cwd: 'projects', exitMsg: `${project} 仓库克隆完成` }))
}

const clearProjects = () => {
  spawnSync('rm', ['-rf', './*'], { cwd: 'projects' })
}

const cloneProjects = async () => {
  const projects = Object.entries(projectsMap);
  const promises = await clone(projects);
  await Promise.all(promises);
}

const main = async () => {
  try {
    clearProjects();
    await cloneProjects();
  } catch (error) {
    console.error(error)
  }
}


module.exports = main;



