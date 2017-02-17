const getGlobal = require('../lib/getGlobal')
const merge = require('../lib/merge')
const assert = require('assert')

let globalVal = require('../lib/global')

let checkLogin = require('../lib/checkLogin')
describe('check login', function () {
  it('check login false', (done) => {    
    checkLogin((err, isLogin) => {
      console.log(isLogin)
      assert.equal(false, isLogin)
      done(err)
    })
  })
  // todo
  // it('check login sucess', (done) => {
  //   getGlobal((err, gv) => {
  //       // err && logger.error(err)
  //       merge(globalVal, JSON.parse(gv.toString()))
  //   })
  // })
})
