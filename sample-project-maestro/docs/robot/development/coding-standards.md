# Coding standards

## Bslint

We use [bslint](https://github.com/rokucommunity/bslint) to enforce our coding standards as much as possible. bslint is under active development, and does not cover, nor will it ever cover, all cases. Therefore, please pay attention to this document.

## Golden rules

- Take pride in your code: It is possible to architecture beautiful, performant, maintainable and enjoyable-to-maintain applications; we are using cutting edge roku development practices and procedures to do just that. Please keep the pace, and do the same
- Write testable code, favouring classes as much as possible
- Feedback pain points to the open source community for tools such as brighterscript, bslint, maestro, rooibos, etc. Or better still, submit prs. As those of us who have come from other platforms well know: a bigger cake for everyone is better than a bigger slice of cake for a few

## File naming and locations

- All folder names are `kebab-case`
- All roku source files are `CamelCase.extension`
- Name files as what they really are. Does the file contain `DeeplinkProcessor`? it is `DeeplinkProcessor.bs`. Making a home screen? Then you will make `HomeScreen.xml`, `HomeScreenVM.bs` and `HomeScreenVM.spec.bs`
- Place files in appropriate locations:
  - All xml components for views/screens/etc go in `components/sub-folder`
  - All source files go in `source/sub-folder`
  - Keep related files in the same locations: e.g
    - `components/screens/HomeScreen.xml`
    - `source/screens/HomeScreenVM.bs`
    - `source/screens/HomeScreenVM.spec.bs`

## vscode project settings

We share the vscode project settings, so everyone on the team has the same setup. The only files that team-members need to change (both of which are git ignored) are:

- `.env` - contains roku ip address and password
- `project.xsd` - generated xsd file to give code-completion in xml files

No files in `.vscode` should ever be updated, unless for a specific reason

## Formatting

- Formatting settings are configured in the `.vscode` settings and shared amongst the team
- Ensure your source files are formatted ahead of committing
- All text file line endings are configured to `LF` in git

### XML files

- Attributes are split on multiple lines
- Validation is disabled, to not produce spurious maestro binding errors (this will be resolved with a better mechanism around Q4 2021)
- Empty content is preserved
- Single quotes are used throughout, to allow for maestro inline code bindings
- Do not include xsd declarations, as this breaks auto-completion with the redhat xml extension
- File contents are ordered as such:
  - script imports (though these are strongly discouraged: we prefer .bs `import` directives instead)
  - interface
    - fields (id, type, value)
    - funcs (name)
  - Children
    - Background elements
    - Foreground elements
  - Animations are placed at the bottom of the file. We prefer maestro animation wrappers in most cases.

### Bs files

- ALWAYS write `.bs` files. We do not use `.brs` files on this project
- Imports always go at the top
- Try to keep files atomic - one class, to one file. There are occasional exceptions to this rule (i.e. when having a bunch of related utility classes); but that's the exception, not the rule

#### Namespaces

- If a file has a namespace, then it will wrap everything in that file
- Check if a namespace name that suits your objective exists; if so, use it
- If creating a namespace, use a sensible namespace, start with `robot` - e.g. `robot.screens`
- Ideally, namespaced functions/classes will be located in the same folder structure (e.g. class `HomeScreenVM` in namespace `robot.screens`, would be in the file `source/screens/HomeScreenVM.bs`)

#### Classes

- Name classes appropriately:
  - For Screens/Controls/ViewModels/Tasks use nouns: e.g. `HomeScreen`, `DynamicGroup`, `DialogButton`, `NetworkTask`
  - For managers/processors use verbs: `DeeplinkProcessor`, `EntitlementsManager`
  - Do not use non-standard abbreviations.
    - not ok: `AuCheckMngrProc`
    - Ok: `HttpCodes`, `AuthCheckManagerProcessor`
- Extend appropriate classes:
  - For ViewModels, extend `robot.lib.BaseVM`
  - For general classes (e.g. non-node classes), extend `robot.lib.BaseClass`
- Split your classes into sections
  - Use project standard headers for each section
    - Using the header snippet for missing headers
    - And template snippets for new files (which contain all the required headers)
    - Header ordering is as follows (some sections may not be required, pending the type of class being authored):
      - Public fields
      - Views
      - State
      - Initialization
      - Public methods
      - Overridden methods
      - Callbacks
      - Private methods
      - Key Presses
      - Lifecycle
    - Use other headers when appropriate, e.g. `Authentication callbacks`, `calendar logic`, etc; but keep them above Private methods
- Keep `@inject`ed fields together whenever possible
- Declaring fields and functions
  - Always use correct access modifiers `public|private|protected|`
  - Always add type. e.g. `as boolean`, `as integer`
  - Use maestro helper types `mc.types.node`, `mc.types.assocarray`, `mc.types.array` where appropriate
  - Use return types for non-void functions
  - Always use functions - if you return nothing, then declare the function `as void`
  - Do not declare `as void` unless strictly required
  -
- Follow unit testing friendly practices:
  - Use wrap calls to namespaced methods wherever possible
    - e.g. `m.getInstance` can be stubbed, `mioc.getInstance` cannot
    - Most base classes have a wrapper function for framework methods
      - If not, add a wrapper to your class, and pull it into a suitable baseclass later, if more classes use the wrapped function
  - Use maestro framework methods and wrapped versions where possible:
    - `m.createSGNode`, can be mocked, `createObject` cannot
    - `m.observeNodeField` can be mocked `observeField` cannot (plus the maestro version has other benefits beside)
- Always write code that is easy to unit test, navigate and locate symbols for. Everyone on the team thanks you when they can use the ide instead of grepping

#### Function and variable naming

- Name things accurately, without abbreviations
- For fields, use `isXXX`, to denote when something is boolean. e.g. `isActive`, `isVisible`, it's okay to simply use `visible`, `active` for params
- For fields that will change a lot, which are stateful, name them `currentXXX`, e.g. `currentSelection`, `currentItem`, to help readers understand the volatility and importance of these fields
- For methods, be descriptive in the name
- Adhere to Single Responsibility Principal - if you can't name a function because it does more than one thing, then you have too much code in your function. Split it into smaller functions you can accurately name
- Any callback will be name `onAction`. e.g `onSelected`, `onLoaded`. In cases where a class is observing multiple subjects, use the subject name to help identify the subject: e.g. `onHeroListFocusItem`, `onContentListSelectItem`
- Do not name functions as properties. Brighterscript is not typescript, nor swift, nor c# - it does not have getters. Therefore, please name any function that get's something `getThing()`

#### Comments

- Do not comment in the code if it can be avoided.
  - Comments are dead text: In roku, we prefer logging - use `m.log.info`, `m.log.verbose`, etc
  - Due to roku debugging limitations (no backtrace on crossing a node boundary), it is essential to have log output to give context to how one arrived at a certain place
  - Logs are stripped in prod, so log to your hearts content, without worrying about harming application performance
- class/field comments can be added by adding a line comment before a function namespaced function, class function or class field - no special format is needed
  - But use jsdoc style annotations for params and returns, if not obvious from the name, or there are some important caveats/other information to consider
    - @params {type} name - description
    - @returns {type} description
