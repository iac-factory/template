### Typescript ###

Given `iac-factory` uses `typescript` for ***every*** node.js package, the next section relates
to, again, only first-time setup.

1. Install `typescript`
    ```bash
    npm install --save-dev typescript@latest tslib@latest @types/node
    npm install --save-optional @swc/core@latest @swc/helpers@latest
    npm install --save-peer ts-node@latest
    ```
2. Update `package.json`
    - Because `ts-node` is technically a development-only dependency, it's useful and in some contexts
      a requirement to update the `peerDepedenciesMeta` section of the `package.json` file.

   <br/>

   `package.json`

   ```json
   ...
   {
       "peerDependenciesMeta": {
            "ts-node": {
                "optional": true
            }
       }
   }
   ```

Note that the following section is not a full, exhaustive list of `@iac-factory/eslint-settings`'s
`peerDependenciesMeta` declaration; the [**Typescript Setup**](#typescript-setup) section is only for
conceptual configuration. Changes occur over time, and its of best interest to avoid otherwise
*code-breaking settings*. Additionally, to avoid introducing *drift*  from the perspective of documentation.
