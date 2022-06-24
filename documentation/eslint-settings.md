## Overview ##

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript
code, with the goal of making code more consistent and avoiding bugs. In many ways, it is
similar to JSLint and JSHint with a few exceptions:

- ESLint uses `Espree` for JavaScript parsing.
- ESLint uses an AST to evaluate patterns in code.
- ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

## Usage ##

```
npm install --save-dev @iac-factory/eslint-settings
```

Due to `npm` Markdown rendering, please see the [example (`.eslintrc.json`)](https://github.com/iac-factory/eslint-settings/blob/Development/example.eslintrc.json) configuration.

