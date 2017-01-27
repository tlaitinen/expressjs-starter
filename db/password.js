let crypto = require('crypto');
function hash(strength, salt, password) {
  let rounds = Math.pow(2, strength);
  let h = crypto.createHash('sha256');
  h.update(password);
  h.update(salt.toString('base64'));
  let d = h.digest();
  for (let r = 0; r < rounds + 1; r++) {
    h = crypto.createHash('sha256');
    h.update(d);
    d = h.digest();
  }
  return ['sha256', strength, salt.toString('base64'), d.toString('base64')]
    .join('|');
}
function makeSalt() {
  return crypto.randomBytes(16);
}

function verify(token, password) {
  let [mode, strengthStr, saltB64, _digestB64] = token.split('|');
  let strength = parseInt(strengthStr);
  let salt     = new Buffer(saltB64, 'base64');

  switch(mode) {
    case 'sha256':
      return hash(strength, salt, password) == token;
    default:
      return false;
  }
}

module.exports = {
  verify,
  hash,
  makeSalt
};
