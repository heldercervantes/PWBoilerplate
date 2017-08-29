// modules
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var flattenObject = require('flatten-object');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

// paths
var paths = {
    src: {
        sass: [
          './src/templates/vendor/**/*.css',
          './src/templates/scss/**/*.scss'
        ],

        js: {
          hint: [
            './src/templates/js/**/*.js'
          ],
          compile: [
            './src/templates/vendor/**/*.js',
            './src/templates/js/**/*.js'
          ]
        },

        mirror: [
          './src/templates/*',
          './src/templates/includes/**/*',
          './src/templates/images/**/*',
          './src/templates/vendor/**/*'
        ]
    },

    dist: {
        css: './dist/site/templates/css/',
        js: './dist/site/templates/js/',
        mirror: './dist/site/'
    }
};

// convert object to flat array
var flatArrayFromObject = function(ob) {
  var array = [];

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        array.push(flatObject[x]);
      }
    } else {
      array.push(ob[i]);
    }
   }
   return array;
};

// tasks
gulp.task('sass', function() {
    gulp.src(paths.src.sass)
        .pipe(sass({includePaths: ['./src/styles']}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({advanced: false}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('js_hint', function() {
    gulp.src(paths.src.js.hint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('js_compile', function() {
    gulp.src(flatArrayFromObject(paths.src.js.compile))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('mirror', function() {
  gulp.src(paths.src.mirror, { "base" : "./src/" })
      .pipe(watch(paths.src.mirror, { "base" : "./src/" }))
      .pipe(gulp.dest(paths.dist.mirror));
});

// watch files
gulp.task('watch', function () {
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.js.hint, ['js_hint']);
  gulp.watch(flatArrayFromObject(paths.src.js.compile), ['js_compile']);
});

// run tasks
gulp.task('default', ['sass', 'js_hint', 'js_compile', 'mirror', 'watch']);
