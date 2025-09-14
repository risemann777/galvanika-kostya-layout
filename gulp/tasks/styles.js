import {src, dest} from 'gulp'
import config from '../config.js'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

export default function styles() {
  const sassCompiler = gulpSass(sass)

  return src(config.app.styles)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "STYLES",
        message: "<%= error.message %>"
      })
    }))
    .pipe(gulpif(config.env === "development", sourcemaps.init()))
    .pipe(gulpif(config.env === "production", autoprefixer()))
    .pipe(sassCompiler({outputStyle: 'compressed'}, true).on('error', sassCompiler.logError))
    .pipe(gulpif(config.env === "development", sourcemaps.write()))
    .pipe(dest(config.dist.styles))
}
