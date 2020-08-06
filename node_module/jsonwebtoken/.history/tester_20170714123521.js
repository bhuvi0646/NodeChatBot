TokenGen = require('./tokenGenerator')
jwt = require('./')
tg = new TokenGen('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '2m', notBefore: '10s' })
token = tg.sign({ a: 1 }, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })
setTimeout(function() {
  token2 = tg.refresh(token, { verify: { audience: 'myaud', issuer: 'myissuer' }, jwtid: '2' })
  console.log(jwt.decode(token, { complete: true }))
  console.log(jwt.decode(token2, { complete: true }))
}, 2000)