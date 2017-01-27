let yaml = require('js-yaml');
let fs = require('fs');

let cfg = {
  cookieKey: 'test-key',
  cookieParams: {
    httpOnly: true,
    signed: true,
    maxAge: 365 * 86400 * 1000
  },
  database:'postgres://test:test@localhost/test',
  debug:true
};

try {
  cfg = yaml.safeLoad(fs.readFileSync('expressjs-starter.yml', 'utf8'));
} catch (_e) {
  console.log('Could not open expressjs-starter.yml. Using default settings');
}
module.exports = cfg;
