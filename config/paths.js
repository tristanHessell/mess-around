const fs = require('fs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function ensureSlash(inputPath, needsSlash) {
  if (inputPath == null) {
    throw new Error('inputPath missing value');
  }
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const publicUrl = process.env.PUBLIC_URL;

// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/bundle.7289d.js. We have to know the root.
const publicPath = ensureSlash(publicUrl, true);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'json',
  'web.jsx',
  'jsx',
];

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('app'),
  appHtml: resolveApp('app/index.html'),
  appIndexJs: './src/frontend/index.js',
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl,
  publicPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
