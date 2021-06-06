#!/usr/bin/env node

import names from './names.js'

const MOMENTARY = 'momentary'
const WATCH = 'watch'

const mode = process.argv[1].split('/').pop().includes('watch')
  ? WATCH
  : MOMENTARY

console.log(`starting ${names.APP} in ${mode} mode...`)
