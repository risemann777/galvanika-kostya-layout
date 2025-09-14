import {src, dest} from 'gulp'
import config from '../config.js'
import gulpif from 'gulp-if'
import gulpChanged from 'gulp-changed'

export default function images() {
	return src(config.app.img.src, {
		encoding: config.app.img.encoding,
	})
		.pipe(gulpif(config.env === "development", gulpChanged(config.dist.img)))
		.pipe(dest(config.dist.img))
}