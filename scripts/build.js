// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { promisify } = require('util');
const fs = require('fs-extra');
const webpack = require('webpack');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const configFactory = require('../config/webpack.config');
const paths = require('../config/paths');

// const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
// const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Generate configuration
const config = configFactory();

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, false)
  .then(() => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build();
  })
  .then(({ warnings }) => {
    if (warnings.length) {
      console.log('Compiled with warnings');
    } else {
      console.log('Compiled successfully.');
    }
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message, err.stack);
    }
    console.log(err);
    process.exit(1);
  });

async function build() {
  const compiler = webpack(config);
  const compileP = promisify(compiler.run.bind(compiler));
  const stats = await compileP();

  let messages, err;
  if (err) {
    if (!err.message) {
      throw err;
    }
    messages = formatWebpackMessages({
      errors: [err.message],
      warnings: [],
    });
  } else {
    messages = formatWebpackMessages(
      stats.toJson({ all: false, warnings: true, errors: true }),
    );
  }
  if (messages.errors.length) {
    // Only keep the first error. Others are often indicative
    // of the same problem, but confuse the reader with noise.
    if (messages.errors.length > 1) {
      messages.errors.length = 1;
    }
    throw new Error(messages.errors.join('\n'));
  }
  if (
    process.env.CI &&
    (typeof process.env.CI !== 'string' ||
      process.env.CI.toLowerCase() !== 'false') &&
    messages.warnings.length
  ) {
    console.log(
      'Treating warnings as errors because process.env.CI = true. Most CI servers set it automatically.',
    );
    throw new Error(messages.warnings.join('\n'));
  }
  return {
    stats,
    warnings: messages.warnings,
  };
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
}
