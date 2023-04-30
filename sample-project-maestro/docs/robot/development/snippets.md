# Snippets

This project includes many snippets to make it easier for developers to code in a uniform manner and quicker learn apis/coding standards. There are snippets for:

| Snippet Language | Use                                                                                |
| ---------------- | ---------------------------------------------------------------------------------- |
| json             | Contains snippets that facilitate quicker coding in style.json files               |
| brighterscript   | Contains snippets for: maestro framework, rooibos unit testing, templates and more |

## Brighterscript snippets

### Templates

Start your new files by using a template snippet, as follows

| Snippet               | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| template_control      | Template source for a new visual control (e.g. Button, Label, etc) |
| template_controltests | Template source for a unit test file for a visual control          |
| template_screen       | Template source for a new node class Screen                        |
| template_screentests  | Template source for a unit test file for a screen                  |
| template_task         | Template source for a new Task                                     |
| template_tasktests    | Template source for a unit test file for a task                    |
| template_model        | Template source for a new model                                    |

### General coding

Snippets that will help you learn and write common functions

| Snippet            | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| header             | A header section to break up code files                               |
| logxxx             | log statement, where xxx is (info\| warn \| error \| verbose)         |
| getChildren        | snippet to getChildren from a node                                    |
| observeNodeField   |                                                                       |
| unobserveNodeField |                                                                       |
| createTask         | standard way to create a task                                         |
| function           | snippet to create a function                                          |
| cyclefocus         | snippet to cycle an array of items, useful in keypress focus handlers |
| creeatesgnode      | snippets for maestro's createSGNode function                          |

### Type definitions

Learn these simple mnemonics so that you don't have to type so much when the linter wants you to add types
| Snippet | Description |
| --- | --- |
|ai|"as integer"|
|an|"as node"|
|aa|"as array"|
|aaa|"as assocarray"|
|af|"as float"|
|ao|"as object"|
|ab|"as boolean"|

### diagnostic hints

These are useful to make quieten unnecessary diagnostic messsages

| Snippet | Description                      |
| ------- | -------------------------------- |
| bsdl    | brighterscript disbale next line |
| csdl    | cspell disbale next line         |
| csd     | cspell disbale                   |
| cse     | cspell enable                    |

### Lifecycle methods

These snippets will create the most common maestro lifecycle method handlers for you.

| Snippet     | Description |
| ----------- | ----------- |
| onLostFocus |             |
| onshow      |             |
| onfirstshow |             |
| onhide      |             |

### Key presses

These snippets create maestro keypress handler functions

| Snippet                | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| isCapturingAnyKeyPress | returns true if the unhandled keypress _key_ is captured by this view |
| onKeyPressDown         |                                                                       |
| onKeyPressUp           |                                                                       |
| onKeyPressLeft         |                                                                       |
| onKeyPressRight        |                                                                       |
| onKeyPressReplay       |                                                                       |
| onKeyPressRewind       |                                                                       |
| onKeyPressFastForward  |                                                                       |
| onKeyPressBack         |                                                                       |
| onKeyPressOptions      |                                                                       |
| onKeyPressOK           |                                                                       |
| onKeyPressPlay         |                                                                       |

### Testing snippets

#### Object creating

These snippets are useful for rapidly creating stub objects:

| Snippet | Description                                             |
| ------- | ------------------------------------------------------- |
| so      | createds a stub json object                             |
| aso     | creates a stub json object, inside an associative array |
| mso     | creates a stub json object and stores it on m           |
| sioc    | creates a stub json object, stores it on m, and in ioc  |

#### Expect

These snippets are super useful for quickly stubbing methods in your unit tests:

| Snippet                | Description                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| expectCalled                 | expect a function is called                                                                                                                                             |
| eonf                   | expect `observeNodeField`                                                                                                                                               |
| eunf                   | expect `unObserveNodeField`                                                                                                                                             |
| expectObject       | creates a stub object and expects a method is called, which returns the stub object                                                                                     |
| expectGet      | creates a stub object and expects a call to ioc (e.g. getInstance) is called, which returns the stub object                                                             |
| expectExpect           | creates a stub object and expects a call to ioc (e.g. getInstance) is called, which returns the stub object. A method call is then expected on the returned stub object |
| expectNotCalled             | expects that a method is not called                                                                                                                                     |

#### Other testing snippets

There are other snippets for additional `beforeEach`, `afterEach` handlers, and all rooibos asserts.

## json snippets

Note the preferred means of creating views is:

- create the view in styles.json
- load the json view via the `createViewsFromStyleJson` maestro api

Ideally, the view json will be extracted using the maestro figma plugin. However, there may be times when this is impractical. For this reason, this project contains some snippets to help with creating view controls by hand, in `Styles.json` file.

Each snippet has tab-stops for the most likely edited fields.

| Snippet          | Description                               |
| ---------------- | ----------------------------------------- |
| loadingindicator | Creates a json blob for LoadingIndicator  |
| mlabel           | Creates a json blob for maestro label     |
| mposter          | Creates a json blob for maestro poster    |
| mrectangle       | Creates a json blob for maestro rectangle |
