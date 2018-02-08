'use strict';

let path = require('path');
let webpack = require('webpack');
let uglifyJSPlugin = require('uglifyjs-webpack-plugin');
let webpackNotifierPlugin = require('webpack-notifier');
let baseConfig = require('./base');
let defaultSetting = require('./defaults');

