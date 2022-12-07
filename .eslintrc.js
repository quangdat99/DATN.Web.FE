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
    'vue/no-unused-components': 'off',
    'no-const-assign': 'off',
    'no-useless-escape': 'off',
    'no-undef': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/require-prop-types': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/attributes-order': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/order-in-components': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/html-quotes': 'off',
    'no-debugger': 'off',
    'no-prototype-builtins': 'off',
    'vue/prop-name-casing': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/no-mutating-props': 'off',
    'no-dupe-keys': 'off',
    'vue/no-dupe-keys': 'off',
    'no-case-declarations': 'off',
    'vue/v-slot-style': 'off',
  }
}