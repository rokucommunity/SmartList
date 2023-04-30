# Testing

## TDD - Focus on the D, not the T

Remember the golden rule: TDD is a _development_ activity. It is _not_ a testing activity. We do Test Driven _Development_ because it is the fastest way to develop. The fact that we get a regression suite and high test coverage is a welcome side effect.

This is especially true on roku

## Why do we want to do TDD on roku?

### Debugging roku apps is slow and cumbersome

 - Breakpoints are slow as hell in SceneGraph apps: It can take up to 30 seconds to step, depending on the current running async tasks
 - Stepping/Continuing breakpoints crashes SceneGraph apps: You'll be lucky to step 2 or more times before breaking on a waitPort in some random code and having to restart the app
 - The Debugger does not give any context: there is no stack trace for an observer, or a callfunc
 - REPL execution can easily crash the app

### Conversely, debugging is much better in the main scope

 - Breakpoints are fast, pretty much like any other platform
 - Stepping/continuing breakpoints will not crash the app
 - If you're using MVVM/MVC/other classes, you will likely not be crossing any boundaries on ports/observers or callfuncs
 - REPL execution will not crash the app

## Useful testing tips.

 - Extend the robot.tests.BaseTestSuite for all tests, it will always have the best general purpose setup
 - Do not call namespaces, or non-class functions in your code. Wrap those calls so you can use rooibos expect mocks for them. Base classes provide wrappers for many common namespace functions (e.g. `mc.createSGNode`, `mioc.getInstance`, `mc.tasks.observeNodeField`, etc)
 - Use snippets: [Here](rooibos-snippets.md) are some great rooibos snippets, that will make you super quick
 - Make sure to use appropriate asserts, for nodes and arrays, for maximum benefit
 - Put a comment in an assert when the thing your testing is not obvious. e.g. `m.assertFalse(m.vm.isLoggedIn)` > `m.assertFalse(m.vm.isLoggedIn, "we should log the user out when we identify a stolen token")`
 - Use parameterized tests to test a good range of inputs on your functions, especially utility functions. It's really quick to do and makes it easy to build up huge regression suites and save you a lot of legwork in integration testing
 - Use `@only` to run the minimum amount of tests you need for what you are doing.
   - Investigating a fiddly bug on one particular permutation of a parameterized test? - use `@onlyParams` on that param
   - Is it just one test case? Put it about above the `@it` test
   - Just this block of tests? Put it above the `@describe` block?
   - Just this suite? Put it above the `@suite`
   - Just one kind of behavior? i.e. _network_, _vm_, _analytics_, use rooibos tag filtering to run the right thing
 - Use tags! Tag your test elements where appropriate (e.g. `@tags("fixme", "integration", "player")`). Here are some ideas:
   - fixme
   - integration
   - authentication
   - entitlements
   - vm
   - model
   - player
   - analytics
 - Name your elements well. Here are some examples:
   - `@suite("LoginScreenVM tests")`
   - `@describe("constructor")`
   - `@it("configures basic properties")`
   - `@it("does not crash when the user profile is not stored")`
   - `@describe("onProcessLogin")`
   - `@it("does not crash when the server response is invalid")`
   - `@it("shows error message when no credentials are provided")`
   - `@it("shows the server generated human-readable message on failed login, if present")`
 - Avoid testing nodes as much as possible - it's slow and error prone. Favour writing code that is class based so it can be unit tested easily:
   - Write MVVM style code for aggregate views (e.g. screens/components that have many sub-components)
   - Write MVC style `NodeClass` views for composite components (e.g. Buttons, Cells, Custom Controls)
 - Put `@nocatch` above a test/block of tests if your test is crashing and you want to use the breakpoint debugger at the point of the crash

## Faster testing compile times.

If you are working on one, or only a couple of test files, you can save about 3 seconds per build cycle, by updating your bsconfig-test.json file, to omit all spec files, except for only those which are truly essential, by adding the following:

![](testing-exclude-config.png)

In this case, replace `GamesHeader*`, with a suitable regex to match the file you are working on.

# I am not convinced. I don't like testing. It's a waste of time

Well read this:

## A tale of 2 developers: part 1 - creating a login screen

### 1. Regular SG development
 - Developer 1 is working on a login screen. They create an xml file, and a code behind brs file, in the `components` folder and begin to write code. They test the code by continually launching the app, waiting for the initial data to load, and the login screen to show, then moving keys, showing/hiding the keyboard etc.
 - They try to use breakpoints to debug issues; but each time the app stops for 20 seconds. They can only step 1 time before the device hangs.
 - Each run takes them 30 seconds to run through, launch, pressing down twice, then ok to show a keyboard, then hiding the keyboard.
 - Each test cycle, with a breakpoint takes up to 50 seconds, and over a minute, if the device managed a second breakpoint.
 - This developer has to run the app continuously to see if any observers, or fields are misspelled, or have the wrong params. They have to run the app many times to ascertain if the correct visibility states/other focus states are set on their login screen.
 - They have to run through the _happy path_ (could not be more ironically named, in this case), to ensure they didn't break anything.

This developer will take a long time to finish their work, be tired, and no doubt ratty, as a result of having to hold their thought experiments in their head for 50-seconds per cycle to launch the app, navigate the happy path, etc.
They will have no tests at the end of their work, and are more likely to have bugs, as a result of not stretching the code very far.
Their colleagues will have no extra insight into what the code does, or why, nor will they have the safety of tests to check if they break something in the future when they work on the LoginScreen.


### 2. MVC enabled TDD Development

- Developer 2 is working on a login screen. They create an nodeClass file `LoginScreen.bs` in the `source` folder.
- The developer writes a `LoginScreen.spec.bs` file and begins writing tests before writing any other code. They write tests and code for the key handling and focus management, to show and hide the keyboard.
- They work in 5 second cycles, each time, running the test suite, to ensure that the correct elements are focused,
- This developer uses asserts ensure that the visibility and focus properties are correctly set and uses mocks to expect the correct functions are invoked.
- Once the view logic tests are passing, this developer then begins `integration testing`. When they do so, they run through the login screen, taking note of what does not work, and writing unit tests for the failures.
- They then fix the unit tests in 5 second cycles, before going back to integration testing in the running view.

This developer is not tired after this work, as they are not holding things in their head for any length of time, and are getting constant feedback as they develop. They also are building up a set of tests, so they know if they regressed any other parts of the login screen when working. They will have less bugs, as they were able to use parameterized tests or create more simple tests to better exercise the range of code executed, and had more brain capacity available to think about their code, as opposed to wasting their brain power on following repetitive happy-paths to constantly integration test their work.

When they finish development, they are confident that their code performs well, as there are no diagnostics, indicating signature mismatches/field misnaming, and they have a suite of tests that demonstrate that the most fiddly bits of logic are working correctly

## A tale of 2 developers: part 2- Updating the login screen

When the time comes to add additional functionality to the login screen, or make changes to the existing functionality, there will be some differences between the experiences both of these developer face.

### 1. Regular SG development

 - This developer did not generate any regression suite, so has no indication if the new changes break the existing logic
 - Their code is not following MVVM pattern or using MVC node classes, so if some time has passed, or this is another engineer, they will have to read _and code around_ all of the boilerplate code that is responsible for observing and setting fields
 - They will have to go through slow happy-path testing phases, and do this with some diligence to ensure they do not regress the login screen

### 2. MVVM enabled TDD Development
 - This developer has a regression suite with 50 or so unit tests in it, which will indicate any undesired side-effects
 - They are using MVVM pattern, so can very quickly ascertain which values of the VM drive which bits of the view, and where callbacks are wired up. There will be no detective work here.
 - They can work in the same manner as before: fast test cycles to get the functionality right, ensure no regressions then integration test.
 - This developer might have to fix or even throw away some tests. They do not care - the tests are not sacred; they are like scaffolding on a building, or a hoist to lift the engine out of a car. They facilitate rapid development. More tests will be written to rapidly develop the new functionality.