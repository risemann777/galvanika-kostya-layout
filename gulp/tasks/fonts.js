import {src, dest} from 'gulp'
import config from '../config.js'
import gulpif from 'gulp-if'
import gulpChanged from 'gulp-changed'

export default function fonts() {
	return src(config.app.fonts.src, {
		encoding: config.app.fonts.encoding,
	})
		.pipe(gulpif(config.env === "development", gulpChanged(config.dist.fonts)))
		.pipe(dest(config.dist.fonts))
}