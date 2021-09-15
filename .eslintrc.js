module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: "babel-eslint",
    },
    extends: [
        "@nuxtjs",
        "plugin:nuxt/recommended",
        "plugin:vue/essential",
        "eslint:recommended",
        "google",
    ],
    plugins: [
        "html",
        "promise",
        "vue",
    ],
    // add your custom rules here
    rules: {
        "arrow-body-style": ["error", "as-needed"],
        "arrow-parens": ["error", "as-needed"],
        "camelcase": "off",
        "indent": ["error", 4, {"SwitchCase": 1}],
        "linebreak-style": ["error", "unix"],
        "max-len": "off",
        "new-cap": "off",
        "no-console": ["warn", {allow: ["error"]}],
        "no-throw-literal": "off",
        "object-curly-spacing": ["error", "never"],
        "promise/always-return": "off",
        "promise/no-return-wrap": ["error", {allowReject: true}],
        "quotes": ["error", "double"],
        "require-jsdoc": "off",
        "semi": ["error", "never"],
        "space-before-function-paren": ["error", "never"],
        "vue/html-indent": ["error", 4],
        "vue/valid-v-slot": ["error", {allowModifiers: true}],
    },
}
