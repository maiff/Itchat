const Itchat = require('../index')
const assert = require('assert')

describe('login', function () {
  let test = new Itchat()
  test.run()
  it('getUuid', function (done) {
    test.on('getUuid', (err, uuid) => {
      // console.log(uuid)
      assert.equal(12, uuid.length)
      done(err)
    })
  })
  it('login', function (done) {
    test.on('login', (err, status) => {
      // console.log(uuid)
      assert.equal('string', typeof status)
      done(err)
    })
  })  
})