var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');

var paths = {
  scripts: ['lib/**/*.js'],
  spec: 'test/spec/*.js'
};

gulp.task("webpack", function(callback) {
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
            presets: ['es2015']
          }
        }]
      },
      plugins: [
        //new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})
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
