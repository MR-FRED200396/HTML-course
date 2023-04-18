const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const cssnano = require('gulp-cssnano');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');



function clear() {
    return src('./build/*', {
        read: false
    })
        .pipe(clean());
}

// CSS 

function css() {
    const source = './src/css/*';

    return src(source)
        .pipe(changed(source))
        .pipe(cssnano())
        .pipe(dest('./build/css/'))
        .pipe(browsersync.stream());
}

// CSS 

function js() {
    const source = './src/js/*';

    return src(source)
        .pipe(changed(source))
        .pipe(dest('./build/js/'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('./src/images/*')
        .pipe(imagemin())
        .pipe(dest('./build/images'));
}

// html

function html() {
    return src('./src/*.html')
        .pipe(dest('./build/'))
        .pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
    watch('./src/css/*', css);
    watch('./src/js/*', js);
    watch('./src/*.html', html);
    watch('./src/images/*', img);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, js, css, img));