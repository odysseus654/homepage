const postcss_autoprefixer = require('autoprefixer');
const parallelize = require('concurrent-transform');
const postcss_cssnano = require('cssnano');
const merge = require('merge-stream');
const Gulp = require('gulp');
const AwsPublish = require('gulp-awspublish');
const cfInvalidate = require('gulp-cloudfront-invalidate-aws-publish')
const concat = require('gulp-concat');
const envify = require('@ladjs/gulp-envify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('node-sass'));
const Sourcemaps = require('gulp-sourcemaps');
const Typescript = require('gulp-typescript');
const terser = require('gulp-terser');
const postcss_discardComments = require('postcss-discard-comments');
const Through = require('through2');
const named = require('vinyl-named');
const webpackEngine = require('webpack');
const webpack = require('webpack-stream');
const { argv } = require('yargs');
const webpack_config = require('./webpack.config.js');

const ExtPaths = {
    quasar: 'ext/quasar-2.0.3',
    material_design: 'ext/material-design-icons-iconfont-6.1.0',
    fontawesome_css: 'ext/fontawesome-free-5.15.4-web/css',
    fontawesome_webfonts: 'ext/fontawesome-free-5.15.4-web/webfonts',
//    sentry: 'html/ext/sentry-5.23.0',
}

const DEFAULT_BUILD = 'development';
const ENVIRONMENT = argv.build || DEFAULT_BUILD;
webpack_config.mode = ENVIRONMENT;

// set an S3 header for the files in the requested stream
function setHeader(name, value, ifUnset) {
    function initFile(file) {
        // init Vinyl file file object's s3 hash
        if (!file.s3) {
            file.s3 = {};
            file.s3.headers = {};
            file.s3.path = file.relative.replace(/\\/g, '/');
        }
        return file;
    }

    return Through.obj(function(file,enc,cb) {
        initFile(file);
        if(!ifUnset || !(name in file.s3.headers)) file.s3.headers[name] = value;
        this.push(file);
        cb();
    });
}

function styleSheets(cb) {
    const plugins = [
        postcss_discardComments(),
        postcss_autoprefixer(),
        postcss_cssnano()
    ];
    return merge(
            merge(
                Gulp.src('html/'+ExtPaths.quasar+'/*.css',{base:'./html'}),
                Gulp.src('html/'+ExtPaths.material_design+'/*.css',{base:'./html'})
                    .pipe(replace('url("./fonts/','url("../'+ExtPaths.material_design+'/')),
                merge(
                    Gulp.src('html/'+ExtPaths.fontawesome_css+'/fontawesome.css',{base:'./html'}),
                    Gulp.src('html/'+ExtPaths.fontawesome_css+'/brands.css',{base:'./html'}),
                ).pipe(replace('url("../webfonts/','url("../'+ExtPaths.fontawesome_webfonts+'/')),
                Gulp.src('html/css/*.css',{base:'./html'}),
            )
                .pipe(Sourcemaps.init()),
            Gulp.src('html/css/*.sass',{base:'./html'})
                .pipe(Sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
            )
        .pipe(Sourcemaps.mapSources((sourcePath, file) => {
            const strip = sourcePath.match(/^html\/(.+)$/);
            if(strip) sourcePath = strip[1];
            return '../' + sourcePath;
        }))
        .pipe(concat('html/lib/main.css'))
        .pipe(postcss(plugins))
        .pipe(Sourcemaps.write('./'))
        .pipe(Gulp.dest('./'))
}

function typeScriptShell(cb) {
    const tsProject = Typescript.createProject('shell.json');
    return tsProject.src()
        .pipe(Sourcemaps.init({loadMaps:true}))
        .pipe(tsProject()).js
        .pipe(Sourcemaps.mapSources((sourcePath, file) => {
            const strip = sourcePath.match(/^html\/(.+)$/);
            if(strip) sourcePath = '../' + strip[1];
            return sourcePath;
        }))
        .pipe(terser({compress:{drop_debugger:false}}))
        .pipe(Sourcemaps.write('./'))
        .pipe(Gulp.dest('./'));
}

function typeScriptMain(cb) {
    const tsProject = Typescript.createProject('main.json');
    return merge(
/*            merge(
                    //Gulp.src(ExtPaths.sentry+'/bundle.min.js',{base:'./html'}),
                    Gulp.src('html/'+ExtPaths.quasar+'/vue.min.js',{base:'./html'})
                )
                .pipe(Sourcemaps.init({loadMaps:true}))
                .pipe(Sourcemaps.mapSources((sourcePath, file) => {
                    return '../ext/sentry/' + sourcePath;
                })),*/
            tsProject.src()
                .pipe(Sourcemaps.init({loadMaps:true}))
                .pipe(envify({NODE_ENV:ENVIRONMENT}))
                .pipe(tsProject()).js
                .pipe(Sourcemaps.mapSources((sourcePath, file) => {
                    const strip = sourcePath.match(/^html\/(.+)$/);
                    if(strip) sourcePath = '../' + strip[1];
                    return sourcePath;
                }))
            )
        .pipe(concat('html/lib/main.js'))
        .pipe(terser({compress:{drop_debugger:false}}))
        .pipe(Sourcemaps.write('./'))
        .pipe(Gulp.dest('./'));
}

function typeScriptNode(cb) {
    const tsProject = Typescript.createProject('node.json');
    return tsProject.src()
        .pipe(Sourcemaps.init({loadMaps:true}))
        .pipe(envify({NODE_ENV:ENVIRONMENT}))
        .pipe(replace('__VUE_OPTIONS_API__', 'true'))
        .pipe(replace('__VUE_PROD_DEVTOOLS__', (ENVIRONMENT!='production')?'true':'false'))
        .pipe(tsProject()).js
        .pipe(Sourcemaps.mapSources((sourcePath, file) => {
            const strip = sourcePath.match(/^node_modules\/(.+)$/);
            if(strip) sourcePath = '../' + strip[1];
            return sourcePath;
        }))
        .pipe(concat('html/lib/node.js'))
        .pipe(terser({compress:{drop_debugger:false}}))
        .pipe(Sourcemaps.write('./'))
        .pipe(Gulp.dest('./'));
}

function webpackTask(cb) {
    return Gulp.src('html/vue/*',{base:'./html'})
        .pipe(named())
        .pipe(webpack(webpack_config, webpackEngine))
        .pipe(replace('__webpack_basename__', function() {
            // Replaces instances of "filename" with "file.txt"
            // this.file is also available for regex replace
            // See https://github.com/gulpjs/vinyl#instance-properties for details on available properties
            const baseName = this.file.relative.match(/^(.+)\.[0-9a-f]{8}\.js$/);
            if(baseName) return baseName[1];
            return this.file.relative;
        }))
        .pipe(replace('__UPDATE_TIME__', (new Date()).toString()))
        .pipe(Sourcemaps.init({loadMaps:true}))
        .pipe(Through.obj(function(file,enc,cb) {
            // Dont pipe through any source map files as it will be handled
            // by gulp-sourcemaps
            const isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        }))
        .pipe(concat('html/lib/vue.js'))
        .pipe(terser())
        .pipe(Sourcemaps.write('./'))
        .pipe(Gulp.dest('./'));
}

function awsPublish(cb) {
    const publisher = AwsPublish.create(
        {
            region: "us-east-1",
            params: {
                Bucket: "heath-homepage"
            }
        }
    );

    const cfSettings = {
        distribution: 'E2ZTKQKOIBKC7W', // Cloudfront distribution ID
        originPath: '/root',            // Configure OriginPath to be removed of file path to invalidation
        indexRootPath: true             // Invalidate index.html root paths (`foo/index.html` and `foo/`) (default: false)
      };
      
      return merge(
            typeScriptShell(cb),
            typeScriptNode(cb),
            typeScriptMain(cb),
            styleSheets(cb)
                .pipe(setHeader('Cache-Control', 'max-age=31536000, public')),
            webpackTask(cb),
            Gulp.src('html/*',{base:'./html'}),
            //Gulp.src('html/images/*',{base:'./html'}),
            merge(
                Gulp.src('html/'+ExtPaths.material_design+'/*',{base:'./html'}),
                Gulp.src('html/'+ExtPaths.fontawesome_webfonts+'/*',{base:'./html'})
            ).pipe(setHeader('Cache-Control', 'max-age=31536000, public')),
            //Gulp.src('html/ext/LZMA-JS-2.3.0/lzma_worker*.js',{base:'./html'}),
            //Gulp.src('html/ext/lzma2-js-dbe9e72/lzma2_worker*.js',{base:'./html'}),
        )

        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(/^html[\\\/]?/, '');
            path.dirname = (path.dirname ? 'root/' : 'root') + path.dirname;
        }))
        .pipe(Through.obj(function(file,enc,cb) {
            if (file.s3) {
                const path = file.s3.path.replace(/^html[\\\/]?/, '');
                file.s3.path = (path ? 'root/' : 'root') + path;
            }
            this.push(file);
            cb();
        }))

        .pipe(setHeader('Cache-Control', 'max-age=3600, public', true))
        .pipe(AwsPublish.gzip({smaller:true}))
        .pipe(parallelize(publisher.publish({})))
        .pipe(cfInvalidate(cfSettings))
//        .pipe(publisher.cache())
        .pipe(publisher.sync('root/'))
        .pipe(AwsPublish.reporter());
}

exports.default = Gulp.parallel(typeScriptShell, typeScriptNode, typeScriptMain, styleSheets, webpackTask);
exports.publish = awsPublish;
exports.shell = typeScriptShell;
exports.main = typeScriptMain;
exports.node = typeScriptNode;
exports.stylesheets = styleSheets;
exports.webpack = webpackTask;