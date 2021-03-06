/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  'presets': ['next/babel'],
};