import {task, parallel, series, watch} from 'gulp'
import config from './gulp/config.js'
import browserSync from 'browser-sync'

import templates from './gulp/tasks/templates.js'
import styles from './gulp/tasks/styles.js'
import scripts from "./gulp/tasks/scripts.js"
import images from "./gulp/tasks/images.js"
import fonts from "./gulp/tasks/fonts.js"
import clean from "./gulp/tasks/clean.js"

task('watch', () => {
  browserSync.init({
    server: config.dist.dist,
    notify: false
  })

  watch(config.watch.pug, {usePolling: true}, series(templates))
    .on('all', (event, filepath) => {
      global.emittyChangedFile = filepath
    })

  watch(config.watch.html).on('change', browserSync.reload)
  watch(config.watch.styles, {usePolling: true}, series(styles))
  watch(config.dist.styles).on('change', browserSync.reload)
  watch(config.watch.scripts, {usePolling: true}, series(scripts))
  watch(config.dist.scripts).on('change', browserSync.reload)
  watch(config.watch.img, series(images))
  watch(config.watch.fonts, series(fonts))
})

/** Clean and run build tasks */
task('build', series(
  clean,
  parallel(
    templates,
    styles,
    scripts,
    images,
    fonts,
  )
))

/** Rebuild the whole project, start watching files & turn on local server */
task('default', series('build', parallel('watch')))

/**
 * Finish line, preparing the project for production with optimization
 * NODE_ENV will be set to "production" in scripts section of package.json
 * */
task('build', series('build'))
