var gulp = require('gulp');
var clean = require('gulp-clean'); // Removing files and folders
var cleanCSS = require('gulp-clean-css'); //Minify css with clean-css
var concat = require('gulp-concat'); // Concat/Add all SASS files in one file
var sass = require('gulp-sass'); //Convert SASS to CSS
var order = require('gulp-order'); //Set SASS file Order
var uglify = require('gulp-uglify'); //Minify JS
var htmlmin = require("gulp-htmlmin"); //Minify HTMLs
var connect = require("gulp-connect"); // Runs a local dev server
var open = require("gulp-open"); // Open a URL in a Web browser
var flatten = require('gulp-flatten'); //remove or replace relative path for files
var plumber = require('gulp-plumber'); //Prevent pipe breaking caused by errors from gulp plugins
var svgmin = require('gulp-svgmin'); //minifyed SVG icons
var runSequence = require('run-sequence'); //Run task in order
var autoprefixer = require('gulp-autoprefixer');
/*var gnf = require('gulp-npm-files');  Copy dependencies from node_module to your project location*/
var jshint = require('gulp-jshint');

var browserify = require('browserify'); //allows us to write node.js-style modules that compile for use in the browser
//var babel = require('babelify');
var _ = require('underscore');
var buffer = require('vinyl-buffer'); //gulp-uglify dosen't support stream, so you should convert stream to buffer using vinyl-buffer
var source = require('vinyl-source-stream');// convert the readable stream you get from browserify into a vinyl stream that is what gulp is expecting to get.
var transform = require('vinyl-transform'); 
var ngAnnotate = require('gulp-ng-annotate'); //automated dependency injection, by giving output with the $inject annotation and become minification-safe

var bases = {
        app: './html/app/',
        dist: './html/dist/',
    },
    paths = {
        scss: ['scss/**/*.scss'],
        js: ['js/**/*.js', '!js/*.min.js'], //Select all js files expect minifyed js. Otherwise watch will stuck in loop
        htmlindex: ['index.html'],
        html: ['view/*.html'],
        htmltemplates: ['view/templates/*.html'],
        img: 'img/*.*',
        svg: 'img/icons/*.svg',
        livereloadsource: ['**/*.min.css', '**/*.min.js', '**/*.html'] // List of files, on which reload works while any change. watch much be run
    };

//allSources = paths.scss.concat(paths.js).concat(paths.htmlindex).concat(paths.html).concat(paths.htmltemplates);

// If true it allow you to not minify your html, css, js
var debug = false;

/*
gulp.task('copyNpmDependenciesAtDifferentFolder', function() {
  gulp
    .src(gnf(null, './package.json'), {base:'./'})
    .pipe(gulp.dest('./html/app/js/test'));
});
*/

gulp.task("cleanfolder", function () {
    return gulp.src(bases.dist, {
            read: false
        })
        .pipe(clean());
});

gulp.task("connect", function () {
    var b = connect.server({
        root: ['HTML/dist'],
        port: 8282,
        base: "http://localhost",
        livereload: true
    });
    return b;
});

gulp.task("open", ["connect"], function () {
    var b = gulp.src("HTML/dist/index.html")
        .pipe(open({
            uri: "http://localhost:8282/#/login",
            "app": "chrome"
        }));
    return b;
});

gulp.task('scss', function () {
    var b = gulp.src(paths.scss, {
            cwd: bases.app
        })
        .pipe(order([
            "variables.scss",
            "common.scss",
            "*.scss"
        ], {
            base: 'HTML/app/scss/'
        }))
        .pipe(concat('app.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }));
    // need to implement gulp-autoprefixer
    b = b.pipe(concat('app.min.css'));
    if (!debug) {
        b = b.pipe(cleanCSS());
    }
    return b
        .pipe(gulp.dest('css', {cwd: bases.dist}))
        .pipe(gulp.dest('css', {cwd: bases.app}));
});

gulp.task('vendors-css', function () {
    var b = gulp.src([
            './node_modules/**/angular-material.min.css',
            './node_modules/**/md-data-table.min.css'
        ])
        .pipe(plumber());
    if (!debug) {
        b = b.pipe(cleanCSS());
    }
    return b
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest('css', {cwd: bases.dist}))
        .pipe(gulp.dest('css', {cwd: bases.app}));
});


gulp.task('htmlindex', function () {
    var b = gulp.src(paths.htmlindex, {
        cwd: bases.app
    });
    if (!debug) {
        b = b.pipe(htmlmin({
            collapseWhitespace: true
        }));
    }
    return b
        .pipe(flatten())
        .pipe(gulp.dest(bases.dist));
});

gulp.task('html', function () {
    var b = gulp.src(paths.html, {
        cwd: bases.app
    });
    if (!debug) {
        b = b.pipe(htmlmin({
            collapseWhitespace: true
        }));
    }
    return b
        .pipe(flatten())
        .pipe(gulp.dest('view', {cwd: bases.dist}));
});

gulp.task('htmltemplates', function () {
    var b = gulp.src(paths.htmltemplates, {
        cwd: bases.app
    });
    if (!debug) {
        b = b.pipe(htmlmin({
            collapseWhitespace: true
        }));
    }
    return b
        .pipe(flatten())
        .pipe(gulp.dest('view/templates', {cwd: bases.dist}));
});

gulp.task('vendors-js', function () {
    var b = browserify();
    getNPMPackageIds().forEach(function (id) {
        b.require(id);
    });

    b = b.bundle()
        .pipe(source('vendors.min.js'))
        .pipe(buffer());

    if (!debug) {
        b = b.pipe(uglify());
    }
    return b
        .pipe(gulp.dest('js', {cwd: bases.dist}))
        .pipe(gulp.dest('js', {cwd: bases.app}));
});

gulp.task('app-js', function () {
    var b = browserify('./html/app/js/app.js'); //Browserify 's start point

    //    getNPMPackageIds().forEach(function (id) {
    //        b.external(id);
    //    });

    //        b = b.transform('babelify', {
    //                presets: ['es2015']
    //        }) // set up Gulp for Developing ES2015 script i.e like used "import * as angular from 'angular'" in app.js
    b = b.bundle()
        .pipe(source('app.min.js')) // gives streaming vinyl file object
        .pipe(buffer()) // convert from streaming to buffered vinyl file object
        .pipe(ngAnnotate());
    if (!debug) {
        b = b.pipe(uglify()); // now gulp-uglify works
    }
    return b
        .pipe(gulp.dest('js', {cwd: bases.dist}))
        .pipe(gulp.dest('js', {cwd: bases.app}));
});

/* Point to be noted:
If $injector being unable to resolve a required dependency. Solution is:
http://chrisdoingweb.com/blog/minifying-browserified-angular-modules/
I did same in all controller see-switchdemoCtrl
*/


gulp.task('copyimg', function () {
    var b = gulp.src([paths.img, '!' + paths.svg], {
            cwd: bases.app
        })
        .pipe(flatten());
    return b.pipe(gulp.dest('img', {cwd: bases.dist}));
});

gulp.task('copysvg', function () {
    var b = gulp.src([paths.svg], {
        cwd: bases.app
    });
    if (!debug) {
        b = b.pipe(svgmin())
    }
    return b.pipe(flatten())
        .pipe(gulp.dest('img/icons', {cwd: bases.dist}));
});

/* Watches task */
gulp.task('watchcss', function () {
    gulp.watch(paths.scss, {
        cwd: bases.app
    }, ['scss']);
});

gulp.task('watchjs', function () {
    gulp.watch(paths.js, {
        cwd: bases.app
    }, ['app-js']);
});

gulp.task('watchhtml', function () {
    gulp.watch(paths.htmlindex, {
        cwd: bases.app
    }, ['htmlindex']);
    gulp.watch(paths.html, {
        cwd: bases.app
    }, ['html']);
    gulp.watch(paths.htmltemplates, {
        cwd: bases.app
    }, ['htmltemplates']);
});

//livereload
gulp.task('livereload', function () {
    gulp.src(paths.livereloadsource, {
            cwd: bases.app
        })
        .pipe(connect.reload());
});
//watch the file changes to trigger livereload - don't forget to run 'gulp watch' first - it is required
gulp.task('watchlivereload', function () {
    gulp.watch(paths.livereloadsource, {
        cwd: bases.app
    }, ['livereload']);
});

gulp.task('watch', ['watchcss', 'watchjs', 'watchhtml']);

//gulp.task('serve', ['default', 'open']);

/* gulp : Default tasks*/
gulp.task('default', ['scss', 'htmlindex', 'html', 'htmltemplates', 'vendors-css', 'vendors-js', 'app-js', 'copyimg', 'copysvg']);
/* gulp serve : to run the app with server*/

/* First run all default task and then open the server */
gulp.task('build', function (callback) {
    runSequence('cleanfolder', 'default', ['open'], 'watchlivereload', callback)
});


/**
 * Helper functions
 * Get all dependencies from package.json
 */

function getNPMPackageIds() {
    var packageManifest = {};
    try {
        packageManifest = require('./package.json');
    } catch (e) {
        // does not have a package.json manifest
    }
    return _.keys(packageManifest.dependencies) || [];
}