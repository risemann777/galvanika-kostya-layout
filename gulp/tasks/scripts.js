import {src, dest} from 'gulp'
import config from '../config.js'
import webpack from 'webpack-stream'
import {resolve} from 'path'

export default function scripts() {
  return src(config.app.scripts)
    .pipe(webpack(
      {
        mode: config.env,
        entry: {
          main: './src/js/main.js',
          plugins: './src/js/plugins.js',
        },
        output: {
          filename: '[name].bundle.js',
          path: resolve('./public/js')
        },
        // watch: true,
        devtool: config.env === "production" ? false : "eval",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              resolve: {
                fullySpecified: false,
              },
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', {
                    debug: config.env === "development",
                    targets: {
                      edge: "17",
                      firefox: "60",
                      chrome: "67",
                      safari: "11.1",
                    },
                    corejs: 3,
                    useBuiltIns: "usage"
                  }]]
                }
              }
            },
            {
              test: /\.(sass|css|scss)$/,
              use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
              test: /\.(less)$/,
              use: ['less-loader']
            }
          ]
        }
      }
    ))
    .pipe(dest(config.dist.scripts))
}