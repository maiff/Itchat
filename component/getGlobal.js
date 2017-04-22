let globalVal = require('../lib/global')
const merge = require('../lib/merge')
const getGlobal = require('../lib/getGlobal')
module.exports = function () {
  getGlobal((err, gv) => {
    // err && logger.error(err)
    if (gv !== '') {
      merge(globalVal, JSON.parse(gv.toString()))
      this.emit('checkLogin', err, gv)
    } else {
      process.nextTick(() => this.emit('start', err))
    }
  })
}
