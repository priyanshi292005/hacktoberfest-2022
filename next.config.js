const childProcess = require('child_process');
const nextLog = require('next/dist/build/output/log');

const getBuildId = () => {
  // Prefer BUILD_ID env var if available
  if (process.env.BUILD_ID !== undefined) return process.env.BUILD_ID;

  // Attempt to get current git sha
  try {
    return childProcess.execSync('git rev-parse HEAD').toString().trim();
  } catch (_) {
    // Ignore any error
  }

  // Default to Next's own generation
  return null;
};

/** @type {import('next').NextConfig} */
module.exports = {
  generateBuildId() {
    const proposedBuildId = getBuildId();
    nextLog.info(`Using build ID: ${proposedBuildId === null
        ? 'auto-generated'
        : `'${proposedBuildId}'`}`);
    return proposedBuildId;
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff2?)/,
      type: 'asset/resource',
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};
