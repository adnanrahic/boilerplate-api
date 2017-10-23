module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "globals": {
        "__root": true,
        "logger": true
    },
    "plugins": ["node"],
    "extends": ["eslint:recommended", "plugin:node/recommended"],
    "rules": {
        "node/no-unpublished-require": ["error", {
            "allowModules": [
                "mocha",
                "chai",
                "chai-http",
                "chai-as-promised"
            ]
        }],
        "node/exports-style": [
            "error", 
            "module.exports"
        ],
        "indent": [
            "error",
            2
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
        ]
    }
};