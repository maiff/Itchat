const init = require('../lib/init')
module.exports = function () {
  this.on('getAuth', (err, obj) => {
    err && null //本身就会报错，没有重定向
    init(obj, (err, res) => { // set syncKey
      this.emit('init', err, res)
    })
  })
}
