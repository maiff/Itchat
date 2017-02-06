const childProcess = require('child_process')

let cmd = ''
module.exports = function open (url) {
  if (process.platform === 'wind32') {
    console.log('your platform is not supported')
  } else if (process.platform === 'linux') {
    cmd = 'xdg-open'
  } else if (process.platform === 'darwin') {
    cmd = 'open'
  }
  childProcess.exec(cmd + ' "' + url + '"')
}
