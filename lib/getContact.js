const request = require('superagent')
let globalVal = require('./global')
let time = new Date().getTime()
module.exports = function getContact (fn) {
  let baseUrlContact = `${globalVal.protocol}${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/webwxgetcontact?lang=zh_CN&pass_ticket=${globalVal.pass}&r=${time}&seq=0&skey=${globalVal.skey}`
  // console.log(baseUrlContact)
  // https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact?lang=zh_CN&pass_ticket=gRL405oqouRbLapSoMaM%252BXAwFAHpcmyNWUBA5IMoOen%252BqMJDqreYFuhWq3cSEjyf&r=1486465949870&seq=0&skey=@crypt_d72d99a3_16b09747970bf38ece9b94500201ee88
  request.get(baseUrlContact)
  .redirects(0)
  .set('Cookie', globalVal.cookies)
  .set('Content-Type', 'application/json;charset=UTF-8')
  .end((err, res) => {
    // console.log(res.text)
    let obj = JSON.parse(res.text)
    global.contact = obj
    // request.get(baseUrlEx)
    // .redirects(0)
    // .set('Cookie', globalVal.cookies)
    // .set('Content-Type', 'application/json;charset=UTF-8')
    // .end((err, res) => {
    //   let obj = JSON.parse(res.text)
    //   global.exContact = obj
      // fn && fn(err, res.text)
    // })
    fn && fn(err, res.text)
  })
}
