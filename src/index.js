'use strict';

/**
 * 前端自动部署项目脚本
 */
const { textTitle, textInfo } = require('./utils/textConsole');
const getConfig = require('./getConfig');
const selectEnv = require('./selectEnv');
const buildDist = require('./buildDist');
const compressDist = require('./compressDist');
const deploy = require('./deploy');
const tips = require('./tips');

/* =================== 0、获取配置 =================== */

/* =================== 1、选择部署环境 =================== */

/* =================== 2、项目打包 =================== */

/* =================== 3、项目压缩 =================== */

/* =================== 4、连接服务器 =================== */

/* =================== 5、部署项目 =================== */

global.tips = tips;
const langs = Object.keys(tips);

async function start() {
  const CONFIG = await selectEnv(getConfig());
  if (!CONFIG) process.exit(1);

  global.tipsLang = CONFIG.local.tipsLang
    ? langs.includes(CONFIG.local.tipsLang)
      ? CONFIG.local.tipsLang
      : 'en'
    : 'zh';

  textTitle(`======== ${tips[global.tipsLang].title} ========`);
  textInfo('');

  const [npm, ...script] = CONFIG.local.buildCommand.split(' ');

  // await buildDist('yarn', ['build']);
  await buildDist(npm, [...script]);
  await compressDist(CONFIG.local);
  await deploy(CONFIG.local, CONFIG.server);
  process.exit();
}

module.exports = start;
