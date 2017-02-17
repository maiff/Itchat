let notify = require('./notify')
let logger = require('./log')
module.exports = function checkLogin (fn) {
  notify((err, res) => {
    // console.log(res)
    logger.trace(res)
    logger.debug('start check login ')
    let obj = JSON.parse(res) // {retcode:"1101",selector:"0"}
    if (obj !== null) {
      if (obj.BaseResponse.Ret === 0) {
        fn(err, true)
      } else {
        fn(err, false)
      }
    } else {
      fn(err, false)
    }
  })
}
