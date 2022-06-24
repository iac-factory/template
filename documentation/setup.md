## Setup ##

*Note* - the following section only relates to first-time setup, and shouldn't be needed
unless the goal is to start another ESLint-related package from scratch.

1. Install
    ```bash
    npm install eslint --save-dev
    ```
2. Configure (the following prompts aren't verbatim answers -- such is to avoid changes in the future to the setup
   options)
    ```bash
    npm init @eslint/config
    ```
    - `Check Syntax, Find Problems, Enforce`
    - `JavaScript Modules (import/export)`
    - `No Framework`
    - `Yes, Project Uses Typescript`
    - `Node`
    - `Answer Questions about Code Style`
    - `Configuration Format: JavaScript`
    - `Spaces for Indentation`
    - `Double Quotes`
    - `Unix`
    - `Require Semicolons`
    - `Yes, install @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest`
    - `Package Manager: npm`

Now a general, recommended baseline configuration should be available.

Depending on the configuration format selection, (`yaml`, `json`, `javascript`), a `.eslintrc.*` file
should now be available in the root of the package.

The following repository contains all configuration options, with a few additional `commonjs` related
setups. The default elects to use `commonjs` + `ecma` modules. The default configuration format is
`json`.
