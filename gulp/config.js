'use strict'
import * as process from "node:process"

export default {
  app: {
    pug: 'src/templates/*.pug',
    styles: 'src/styles/*.{sass,scss,css}',
    scripts: ['src/js/main.js'],
    scriptsModules: 'src/js/blocks/*',
    scriptsBackend: 'src/js/js-for-backend/*',
    fonts: {
      src: 'src/fonts/**/*',
      encoding: false
    },
    img: {
      src: 'src/images/**/*',
      encoding: false
    },
  },
  watch: {
    pug: 'src/templates/**/*.pug',
    html: 'public/*.html',
    styles: 'src/styles/**/*.{sass,scss,css}',
    scripts: 'src/js/**/*.js',
    img: 'src/images/*',
    fonts: 'src/fonts/**/*',
  },
  dist: {
    dist: 'public/',
    styles: 'public/css/',
    scripts: 'public/js/',
    img: 'public/images/',
    fonts: 'public/fonts/',
  },
  env: (process.env.NODE_ENV || 'development').trim(),
}
