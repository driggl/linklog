module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120
      }
    ],
    "vue/no-v-html": 0,
    "vue/max-attributes-per-line": ["error", {
      "singleline": 8,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }]
  }
}
