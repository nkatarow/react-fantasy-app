module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
        "ecmascript": 6,
        "jsx": true
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "experimentalDecorators": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react",
  ],
  "extends": "airbnb",
  "rules": {
    "max-len": 0,
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 1,
    "jsx-a11y/anchor-is-valid": 0, // don't warn us about Router's Link not having an href attribute
    "react/no-did-mount-set-state": 0, // allow us to set state in did mount
  }
};
