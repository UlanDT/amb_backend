const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const del = require("del");
const uglify = require('gulp-uglify-es').default;
const ghPages = require('gulp-gh-pages');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

// Deploy
gulp.task('deploy', function () {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});

// Django run server
const django = () => {
    return spawn('python', ['manage.py', 'runserver'])
        .stderr.on('data', (data) => {
            console.log(`${data}`);
        });
}
exports.django = django;

// Styles
const styles = () => {
    return gulp.src("static/src/sass/style.scss")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(gulp.dest("static/css"))
        .pipe(csso())
        .pipe(rename("styles.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(gulp.dest("static/css"))
        .pipe(sync.stream());
}
exports.styles = styles;

// Server
const server = (done) => {
    sync.init({
        server: {
            baseDir: 'main/templates'
        },
        cors: true,
        notify: true,
        ui: false,
    });
    done();
}

exports.server = server;

// Watcher
const watcher = () => {
    gulp.watch("static/src/sass/**/*.scss", {
        delay: 500
    }, gulp.series("styles"));

    // gulp.watch("static/*.html", {
    //     delay: 500
    // }, gulp.series("copyHtml"));
    gulp.watch("build/*.html").on("change", sync.reload);
    gulp.watch("main/templates/**/*.html").on("change", sync.reload);

    gulp.watch("static/src/js/*.js", {
        delay: 500
    }, gulp.series("js"));
    gulp.watch("build/js/*.js").on("change", sync.reload);
    gulp.watch("static/js/*.js").on("change", sync.reload);
}

// Clean
const clean = () => {
    return del(["build", "static/css", "static/js", "static/img", "static/fonts"]);
};
exports.clean = clean;

// Copy

const copyFonts = () => {
    return gulp.src("static/src/fonts/**/*.{woff,woff2}")
        .pipe(gulp.dest("static/fonts"));
};
exports.copyFonts = copyFonts;

const copyHtml = () => {
    return gulp.src([
        "static/*.html"
    ])
        .pipe(gulp.dest("build"))
        .pipe(gulp.dest("main/templates/main"));
};
exports.copyHtml = copyHtml;

const js = () => {
    return gulp.src("static/src/js/*.js")
        .pipe(gulp.dest("static/js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("static/js"))
        .pipe(gulp.dest("build/js"));
};
exports.js = js;

// Images

const images = () => {
    return gulp.src("static/src/img/**/*.{jpg,png,svg}")
        .pipe(imagemin([
            imagemin.optipng({
                quality: 75,
                optimizationLevel: 3
            }),
            imagemin.mozjpeg({
                progressive: true
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("static/img"))
        .pipe(gulp.dest("build/img"));
};
exports.images = images;

// Sprite

const sprite = () => {
    return gulp.src([
        "static/img/**/icon-*.svg",
        "static/img/**/logo-*.svg",
        // "static/img/**/*.svg"
    ])
        .pipe(svgstore())
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("static/img"))
        .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

// Webp

const createWebp = () => {
    return gulp.src("static/img/**/*.{png,jpg}")
        .pipe(webp({
            quality: 90
        }))
        .pipe(gulp.dest("static/img"))
}
exports.webp = createWebp;

// Build

const build = gulp.series(
    clean,
    styles,
    images,
    sprite,
    createWebp,
    copyFonts,
    // copyHtml,
    js
);
exports.build = build

exports.default = gulp.series(
    build, server, watcher,
    // django
);