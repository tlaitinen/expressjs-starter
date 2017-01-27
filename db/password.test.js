test('password hash verify', () => {
  let password = require('./password'); 
  let strength = 17;
  let pwd      = 'c82R_d=?';
  let salt     = password.makeSalt();
  let token    = password.hash(strength, salt, pwd);
  let result   = password.verify(token, pwd);
  expect(result).toBe(true);
});
