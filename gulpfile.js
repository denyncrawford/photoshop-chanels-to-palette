const run = require('gulp-run');
const { watch } = require('gulp');

const js = (cb) => {
    run('npm run build').exec()
     cb()
 }

function defaultTask(cb) {
    watch('src/*.js', js);
    cb();
  }
  
exports.default = defaultTask