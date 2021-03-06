const path = require('path');
function resolvePath(dir) {
  return path.resolve(__dirname, './src', dir);
}

const assetsPath = resolvePath('assets');
module.exports = {
  publicPath: '/',
  configureWebpack: {
    externals: {
      three: 'THREE',
      'dat.gui': 'dat'
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@assets', assetsPath);
  }
};
