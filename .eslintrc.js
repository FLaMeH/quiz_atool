module.exports = {
    root: true,
    parserOptions: {
        "parser": "babel-eslint",
    },
    env: {
        "node": true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
    ],
    plugins: [
        'vue',
    ],
    rules: {
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': 'off',
        'comma-dangle': ['error', 'always-multiline'],
    },
}
