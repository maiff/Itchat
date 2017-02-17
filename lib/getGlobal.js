const fs = require('fs')
let logger = require('./log')

module.exports = function getGlobal (fn) {
  let gv = ''
  let stream = fs.createReadStream('hotlogin_config.js')
  stream.on('data', (data) => {
    gv += data
  })
  stream.on('end', () => {
    logger.trace(gv.toString())
    fn(null, gv)
  })
  stream.on('err', (err) => {
    fn(err, null)
  })  
}
