const {
    src,
    series,
    watch,
    dest
} = require('gulp');
var gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const webp = require('gulp-webp');
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
var rsync = require('gulp-rsync');



const rename = require('gulp-rename');
const reload = browserSync.reload;

// Compilamos los estilos
function style() {
    console.log('Compilamos estilos...');

    return (
        src('./scss/style.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('./dist'))
    );




}

function styleg() {
    console.log('Compilamos estilos...');

    return (
        src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('./dist'))
    );




}

/************************** */
/* COPIAMOS DE DIST A BUILD*/
/*  
              __    
             /  |   
             `| |   
              | |   
             _| |_  
            |_____|
        
*/


// Copiamos  ASSETS de dist a build
function copyAssets() {
    console.log('Copying remaining assets...');
    return (
        src('./assets/**/*')
        .pipe(dest('./build/assets'))
    );
}

function removeImagesForProd() {
    console.log('Removing jpg/png files for prod...');
    
    return (
        src(['./build/assets/**/*.jpg', './build/assets/**/*.png'])
        .pipe(clean())
    )
}

//Convertimos imagenes con Webp
function runWebp() {
    console.log('Converting images with webp...');
    return (
        src(['./assets/**/*.jpg', './assets/**/*.png'])
        .pipe(webp())
        .pipe(dest('./build/assets'))
    );
}

function replaceWithWebp() {
    console.log('Replacing png/jpg with webp...');
    return (
        src(['./build/**/*.js', './build/**/*.css', './build/**/*.html'])
        .pipe(replace('.jpg', '.webp'))
        .pipe(replace('.png', '.webp'))
        .pipe(dest('./build'))
    );
}

// Copiamos HTML de dist a build
function copyTemplates() {
    console.log('Copying templates...');
    return (
        src('./src/*.html')
        .pipe(dest('./build'))
    );
}
// Copiamos CSS de dist a build
function copyStyles() {
    console.log('Copying styles...');
    return (
        src('./dist/*.css')
        .pipe(dest('./build/css'))
    );
}

/************* INJECT
           _____   
          / ___ `. 
         |_/___) | 
         .'____.' 
        / /_____  
        |_______| 
         
*/



// Task for inject assets to templates
function injectAssets() {
    console.log('Injecting assets to templates...');

    var target = src('./build/*.html');
    var sources = src(['./build/css/**/*.css'], {
        read: false
    });

    return target.pipe(inject(sources, {
            relative: true
        }))
        .pipe(dest('./build'));
}


/************* WATCH
               ______   
             / ____ `. 
             `'  __) | 
             _  |__ '. 
            | \____) | 
            \______.' 
                    

 *********** */



function copyTemplatesWatch() {
    console.log('Copying templates...');

    return (
        src('./src/*.html')
        .pipe(dest('./dist'))
    );
}


// Task for inject assets to templates

function styleWatch() {
    return (
        src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
    );
}



function injectAssetsWatch() {
    console.log('Injecting assets to templates...');

    var target = src('./dist/*.html');
    var sources = src(['./dist/css/**/*.css'], {
        read: false
    });

    return target.pipe(inject(sources, {
            relative: true
        }))
        .pipe(dest('./dist'));
}


// Task for launch a server for development purposes
function prodServer() {
    console.log('Launching BUILDING server...');

    browserSync.init({
        server: {
            baseDir: './build/',
            index: 'index.html'
        }
    });

    // Watch tasks
    watch("./scss/**/*.scss", series('style', 'copyStyles')).on('change', browserSync.reload);
    watch('./src/**/*.html', series('copyTemplates', 'injectAssets', 'replaceWithWebp')).on('change', browserSync.reload)
}

function devServer() {
    console.log('Launching BUILDING server...');

    browserSync.init({
        server: {
            baseDir: './build/',
            index: 'index.html'
        }
    });

    // Watch tasks
    watch("./scss/**/*.scss", series('style', 'copyStyles')).on('change', browserSync.reload);
    watch('./src/**/*.html', series('copyTemplates', 'injectAssets')).on('change', browserSync.reload)
}

/********* WATCH PROPIO *********** */


function styleg() {
    //donde esta mi scss 
    return gulp.src('./scss/**/*.scss')
        //pasamos el archivo y lo compilamos
        .pipe(sass())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
}

function guide() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', styleg)
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
}

/******* DEPLOY PRODUCTION *******/
function deploy(){
    return gulp.src(['build/**'])
    .pipe(rsync({
      root: './build',
      hostname: 'u102988965@access852075446.webspace-data.io',
      destination: '/kunden/homepages/38/d852075446/htdocs',
    //   archive: true,
    //   silent: false,
    //   compress: true
    }));
}

exports.guide = guide;
exports.styleg = styleg;


/********* WATCH PROPIO *********** */

// Work tasks


exports.styleWatch = styleWatch;
exports.style = style;
exports.copyTemplates = copyTemplates;
exports.copyTemplatesWatch = copyTemplatesWatch;
exports.copyAssets = copyAssets;
exports.copyStyles = copyStyles;
exports.runWebp = runWebp;
exports.replaceWithWebp = replaceWithWebp;
exports.injectAssets = injectAssets;
exports.injectAssetsWatch = injectAssetsWatch;

// Compile full output
exports.generate = series(style, copyTemplates, copyAssets, copyStyles, injectAssets);

exports.prodExtras = series(removeImagesForProd, runWebp, replaceWithWebp);
// Full development workflow
exports.build = series(this.generate, this.prodExtras);
exports['run-dev'] = series(this.generate, devServer);
exports['run-prod'] = series(this.generate, this.prodExtras, prodServer);
exports['deploy'] = series(this.generate, this.prodExtras, deploy)



// gulp.task('deploy-dev', function() {
//     return gulp.src(['build/**'])
//       .pipe(rsync({
//         root: './build',
//         hostname: 'u102988965@access852075446.webspace-data.io',
//         destination: '/kunden/homepages/38/d852075446/htdocs',
//       //   archive: true,
//       //   silent: false,
//       //   compress: true
//       }));
//   })
