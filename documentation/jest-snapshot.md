### Snapshotting & Jest (Partial) ###

> *Should snapshot files be committed?*

Yes, all snapshot files should be committed alongside the modules they are covering and their tests.

They should be considered part of a test, similar to the value of any other assertion in Jest. In fact,
snapshots represent the state of the source modules at any given point in time. In this way, when the source
modules are modified, Jest can tell what changed from the previous version. It can also provide a lot of
additional context during code review in which reviewers can study your changes better.

> *Does snapshot testing only work with React components?*

React components are a good use case for snapshot testing. ***However, snapshots can capture
any serializable value and should be used anytime the goal is testing whether the output is
correct***.

The Jest repository contains many examples of testing the output of Jest itself, the output of Jest's
assertion library as well as log messages from various parts of the Jest codebase.

> *What's the difference between snapshot testing and visual regression testing?*

*The following answer only relates to User-Interface(s); however, context isn't only limited to
front-end or UI.*

Snapshot testing and visual regression testing are two distinct ways of testing UIs, and they serve
different purposes. Visual regression testing tools take screenshots of web pages and compare the
resulting images pixel by pixel.

*The next answer relates to all types of testing*.

With Snapshot testing values are serialized, stored within text files, and compared using a diff algorithm.

> *Does snapshot testing replace unit testing?*

Snapshot testing is only one of more than 20 assertions that ship with Jest.

The aim of snapshot testing is not to replace existing unit tests, but to provide additional value and
make testing painless. In some scenarios, snapshot testing can potentially remove the need for unit testing
for a particular set of functionalities (e.g. React components), but they can work together as well.

### Additional Notes ###

It's worth noting that the following package ***does not use `ts-jest`***. Contrary to many references online,
***it's not required***.

While this section is contextually related to Unit-Testing, there's detrimental, required domain knowledge
also relating to TypeScript, ECMA and Common-JS.

Limiting package dependencies, so long as it doesn't *add complexity or manual efforts*, is always of high
interest. `ts-jest` isn't a requirement so long as a `typescript` project is first compiled, and compiled
to `common-js`, prior to invoking `jest` (commandline executable).

> *Why not just use ts-jest, anyways? My project is based off of ECMA, so jest doesn't cut it.*

It's not your package type that isn't compliant -- it's how you're transpiling `*.ts` to `*.js`. But
as an admission, this doesn't answer the question:

> *Why not just use ts-jest [...] ?*

While implementation and ensuring of compliance is complex, the answer is simple:

- **Because `ts-jest` isn't kept updated alongside `jest`**.

The team behind `ts-jest` does their best to stay updated, certainly. It's still an external dependency. As such,
drift and dependency hell can occur when developers are attempting to either mitigate security vulnerabilities
or when looking to use the latest technologies.

IaC-Factory intentionally implements all `node` packages via `ECMA`, BUT transpiles to `common-js` simply
for one reason -- **Unit-Testing** compliance with `jest`. However, especially relating to backend-related
`node` runtimes, there are additional benefits.

Writing an entire package in ECMA via TypeScript in such a way of which compiles down to Common-JS isn't easy.
Moreover, as with IaC-Factory packages, transpiling compliant TypeScript even further down to `ES3` JavaScript
isn't any easier, either.

But it's possible, and the case, with all relating packages.

Research and efforts that went into determining an organization-wide compliant means for typescript transpilation
was extensive, and has spanned over the course of ~ 5 months. However, and in confidence, these generalized
configurations found in all related packages are
the most non-opinionated, agnostic settings, determined (at least at this point in time).

Front-end or backend, `node` or `ts-node`, Windows vs. Unix (mostly), IaC-Factory methods of packaging
is compliant in all runtime-related environments. Teams relating to Development, Security, QA, and DevOps
can and all do benefit from a standardized, compliant packaging schema.

### References ###

- [Rules](https://github.com/jest-community/eslint-plugin-jest/tree/main/docs/rules)
- [Snapshot Testing](https://jestjs.io/docs/snapshot-testing)
