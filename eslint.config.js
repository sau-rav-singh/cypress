// eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            // Allows up to 4 chained calls on a single line before flagging an error
            "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 4 }],
            "semi": ["error", "always"] // Matches your "javascript.format.semicolons": "insert"
        }
    }
];
