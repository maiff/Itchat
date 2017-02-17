const fs = require('fs')
let globalVal = require('./global')
let logger = require('./log')

module.exports = function saveGlobal (fn) {
  let stream = fs.createWriteStream('hotlogin_config.js')
  stream.write(JSON.stringify(globalVal))
  stream.on('finish', () => {
    fn && fn(JSON.stringify(globalVal))
    logger.trace(JSON.stringify(globalVal))
    logger.debug('save success')
  })
}