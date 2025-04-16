'use strict';
const fs = require("fs");

const settingPath = './setting.json';
let settingConfig = {
    windowsOption:{},
    logger:{},
    webman:{}
};
let webmanConfig = {};

if (fs.existsSync(settingPath)) {
    let data = fs.readFileSync(settingPath, 'utf8');
    settingConfig = Object.assign({}, settingConfig, JSON.parse(data));
    webmanConfig = settingConfig.webman;
}else {
    throw new Error('setting.json not find');
}

module.exports = settingConfig;
