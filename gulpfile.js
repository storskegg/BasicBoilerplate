'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var file = require('gulp-file');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// All about that SASS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// All about that ES
var rollup = require('gulp-better-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var rootImport = require('rollup-plugin-root-import');
var replace = require('rollup-plugin-replace');
var commonjs = require('rollup-plugin-commonjs');
var babel = require('rollup-plugin-babel');
var uglify = require('gulp-uglifyjs');
var eslint = require('gulp-eslint');

// Everything in Sync
var bs = require('browser-sync').create();

const env = process.env.NODE_ENV;

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('eslint', function() {
    return gulp.src('src/js/**/*.jsx')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jsx', ['eslint'], function () {
    return gulp.src('src/js/main.jsx')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
                nodeResolve({
                    browser: true,
                    main: true,
                    jsnext: true
                }),
                rootImport({
                    root: __dirname + '/src/js',
                    useEntry: 'prepend',
                    extensions: ['.jsx', '.js']
                }),
                replace({
                    'process.env.NODE_ENV': JSON.stringify(env)
                }),
                commonjs({
                    include: [
                      'node_modules/**',
                      'src/js/components'
                    ],
                    namedExports: {
                      'react': [
                          'cloneElement',
                          'createElement',
                          'PropTypes',
                          'Children',
                          'Component'
                      ],
                      'react-dom': ['render']
                    }
                }),
                babel({
                    presets: [
                        ['latest', {
                            es2015: {
                                modules: false
                            }
                        }],
                        ['react']
                    ],
                    plugins: [
                      'external-helpers',
                      'transform-decorators-legacy',
                      'transform-react-jsx'
                    ],
                    babelrc: false,
                    exclude: 'node_modules/**'
                })
            ]
        }, {
            external: [ 'jquery', 'lodash' ],
            format: 'iife'
        }))
        .pipe(uglify({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write(''))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/js'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src('src/sass/app.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'sass',
                'sass/includes'
            ],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/css'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('browser-sync', ['html', 'jsx', 'sass'], function() {
    bs.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('build', ['html', 'sass', 'jsx']);

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('src/index.html', ['html']);
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['jsx']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'watch', 'browser-sync']);
