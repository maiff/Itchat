const syncCheck = require('../lib/syncCheck')
let logger = require('../lib/log')
module.exports = function () {
  this.on('syncCheck', (err) => {
    err && logger.error(err)
    syncCheck((err, res) => {
      let obj = eval(`(${res.match(/=(.+)/)[1]})`)
      if (obj.retcode === '1101') {
        logger.error(`retcode:${obj.retcode}`)
        process.exit(0)
      } else {
        if (obj.selector === '2') this.emit('Mesg', err, res)
        else this.emit('syncCheck', err, res)
      }
    })
  })
}
