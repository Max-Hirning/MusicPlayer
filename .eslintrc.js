module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/no-unstable-nested-components': 'off',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 0,
    "indent": [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
};