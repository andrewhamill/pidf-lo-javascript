const replace = require('rollup-plugin-replace');
const envType = process.env.ENV_TYPE;

module.exports = {
  rollup(config) {

    // ensures node version and browser version are in two distinct folders
    config.output.file = config.output.file.replace('/dist/', `/dist/${envType || 'all'}/`);

    // removes the esm prefix -> that just makes importing the module more difficult
    config.output.file = config.output.file.replace('.esm', '');

    if (envType)
      config.plugins.push(   
        replace({ 'process.envType': `'${envType}'` }),
        // by default we always import the browser-version of dependencies
        // TODO: this has to be solved more elegantly
        replace({ 'dist/browser': `dist/${envType}` }),
      );
    return config;
  },
};