const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ws: path.resolve(__dirname, 'emptyShim.js'),
  stream: path.resolve(__dirname, 'emptyShim.js'),
};

config.resolver.blacklistRE = exclusionList([/node_modules\/ws\/.*/]);

module.exports = config;
