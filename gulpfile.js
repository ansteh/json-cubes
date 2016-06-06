var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var paths = {
  scripts: ['lib/**/*.js'],
  spec: 'test/spec/*.js'
};

gulp.task("webpack-bundle", function(callback) {
    webpack({
      entry: "./index.js",
      output: {
        libraryTarget: "var",
        library: "cubes",
        path: path.resolve(__dirname, 'dist'),
        filename: "json-cubes.bundle.min.js"
      },
      module: {
        loaders: [{
          exclude: /(node_modules|bower_components)/,
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }]
      },
      plugins: [
        //new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({

        }));
        callback();
    });
});

gulp.task("webpack-module", function(callback) {
    webpack({
      entry: "./index.js",
      output: {
        libraryTarget: "var",
        library: "cubes",
        path: path.resolve(__dirname, 'dist'),
        filename: "json-cubes.min.js"
      },
      module: {
        loaders: [{
          exclude: /(node_modules|bower_components)/,
          test: /\.js$/,
          loader: 'babel',
          query: {
            plugins: ['lodash'],
            presets: ['es2015']
          }
        }]
      },
      plugins: [
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({

        }));
        callback();
    });
});

gulp.task('default', ['watch']);
