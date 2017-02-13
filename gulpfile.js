let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let plumber = require('gulp-plumber');
let livereload = require('gulp-livereload');
let mocha = require('gulp-mocha');

gulp.task('develop',() => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('test', () => {
gulp.src('./test/controllers/*.spec.js')
    .pipe(mocha())
    .once('error', (e) => {
      console.log(e);
    })
    .once('end', () => {
      console.log('Test Ended');
      process.exit();
    });
});
gulp.task('default', ['develop']);
