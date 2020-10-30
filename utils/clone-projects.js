const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const { spawnPromise } = require('../common');

const projectsMap = {
  'art': {
    dirName: 'demon-home',
    gitUrl: 'git@192.168.19.2:front-end/demon-home.git'
  },
  'material-admin': {
    dirName: 'anta-admin',
    gitUrl: 'git@192.168.19.2:front-end/anta-admin.git'
  },
}

const clone = (projects = []) => {
  return projects.map(([project, gitUrl]) => spawnPromise('git', ['clone', gitUrl], { cwd: 'projects', exitMsg: `${project} 仓库克隆完成` }))
}

// const clearProjects = () => {
//   spawnSync('rm', ['-rf', './*'], { cwd: 'projects' })
// }

const cloneProjectsCore = async () => {
  const projects = Object.entries(projectsMap).map(item => item.gitUrl);
  const promises = await clone(projects);
  await Promise.all(promises);
}

const cloneProjects = async () => {
  try {
    const isAllProjectExist = Object.values(projectsMap).every(project => fs.existsSync(path.resolve(__dirname), '../projects', project.dirName));
    console.log(isAllProjectExist)
    if (isAllProjectExist) {
      await cloneProjectsCore();
    }
  } catch (error) {
    console.error(error)
  }
}

cloneProjects();

module.exports = cloneProjects;



