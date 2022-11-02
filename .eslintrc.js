module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    parser: '@babel/eslint-parser'
  },
  parser: 'vue-eslint-parser',
  rules: {
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-indent': 'off',
    'vue/max-attr': 'off',
    'vue/eslint-disable-next-line': 'off',
    'vue/eslint-disable': 'off',
    'vue/max-attributes-per-line': 'off',
  }
}