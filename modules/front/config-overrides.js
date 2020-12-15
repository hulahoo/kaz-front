const {override, fixBabelImports, addLessLoader} = require('customize-cra');

const path = require('path');
module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        'overrideTheme': `true; @import "${path.resolve(__dirname, './src/theme.less')}";`,
      },
    },
  }),
);