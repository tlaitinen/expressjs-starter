module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "commonjs": true,
    "jest" : true
  },
  "extends": "eslint:recommended",
  "installedESLint": true,
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
  ],
  "rules": {
    "no-unused-vars": [2, { "args": "all", "varsIgnorePattern": "^_.+", "argsIgnorePattern": "^_.+" }],
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": ["error", { allow: ["warn", "error", "log"] }]
  }
};
