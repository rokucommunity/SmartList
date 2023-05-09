# Tooling

This document explains the various tools used in the roku application.

## Brighterscript (bsc)

This project uses [brighterscript](https://github.com/rokucommunity/brighterscript), and the bsc compiler. The project is configured using the `bsconfig.json` files located in the root folder. See [here](https://github.com/rokucommunity/brighterscript#bsconfigjson) for more information regarding the bsconfig format.

The package.json run scripts call the `scripts/run.js` script to build the app.

bsc compiler is used to build the zip files we deploy to roku devices and provide diagnostics to the ide.

### Bsc Plugins

The `bsconfig.json` files specify several plugins that allow us to enhance the transpilation for builds, and ide behavior. This project uses the following plugins:

| Plugin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
|---|---|
|maestro-roku-bsc-plugin&nbsp;| Maestro framework plugin, adds nodeclass support (`@node` and `@task` annotations), `@strict` mode for classes (enforces all member references on `m`, and warns of anything not in scope, and adds binding validation to xml files|
|rooibos-roku|Imports rooibos framework automatically, parses tests and provides diagnostics on any test misconfiguration|
|roku-log-bsc-plugin| Adds line numbers to logs, or strips logs out entirely|
|robot-bsc-plugin| This is our own custom plugin for doing robot specific build processing. It is included as part of this repo|

Note, that plugins are configured with settings that can be found in the `bsconfig.json` files

## Ropm

This project uses [ropm](https://github.com/rokucommunity/ropm) to install dependencies, such as `maestro-roku` and `roku-log`. ropm is a wrapper around npm that allow roku projects to share code, much like npm. The tool is aware of roku's folder nuances, such as components/source and name spacing collisions.

We opt out of using ropm's auto-prefixing, for maestro-roku, as per maestro-roku's installation instructions.

## Rooibos

[Rooibos unit testing framework](https://github.com/georgejecook/rooibos) is a testing framework for roku, which facilitates:
 - Easy to integrate (all installation/running is handled by a bsc plugin)
 - Has Simple, annotation-based, syntax for writing tests,
 - Features similar to mocha,
   - No need for special file names, or method names
   - Common TDD methods such as Setup/TearDown/BeforeEach/AfterEach
   - Organize tests by suites, groups and cases
 - Readable test output
 - Easily control test execution with `@only`, `@ignore` and `@tags`
 - Simple assert syntax
 - Mocks and stubs,
 - many more (read the docs)

Using Nodeclass/Task MVC patterns with rooibos, will maximize your development velocity on roku. Refer to [testing](testing.md) for more information on how to maximize your productivity, by employing TDD on roku
