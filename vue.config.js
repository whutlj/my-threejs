const path = require('path');
function resolvePath(dir) {
  return path.resolve(__dirname, './src', dir);
}

const assetsPath = resolvePath('assets');
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@assets', assetsPath);
  }
};