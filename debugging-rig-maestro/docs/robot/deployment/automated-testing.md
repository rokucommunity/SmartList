# Automated testing

We use [Roku Test Automation](https://raw.githubusercontent.com/triwav/roku-test-automation) to run our automation tests, for several reasons:

- It's FOSS, so we can contribute, and raise issues,
- It's way more powerful han roku's automated tool
- It's easier to setup and use
- There is a rich API for inspecting running roku apps (such as focused node, getting values, observing, getting screenshots, etc), which can be easily integrated with mocha tests/any other typescript/js tool chains

## Overview

Automation testing is run as followed:

- The automation build is run automatically by CI
- Using the `Automated Tests` launch target, which is used for developing automation tests

## Developing automation tests

The process for developing tests is as follows:

- Write mocha tests for your automated test cases
- `npm run build-automated-test-client` - this creates a prod build, with RTA injected
- Ensure that your profile has env variable set for `ROKU_DEVICE` and `ROKU_DEVICE_PASSWORD`
- Use the `Automated tests` launch client - this rebuilds the scripts folder, on each launch so that the latest test specs are used

## Writing tests

When creating a new test, create a new file and use the `template_rta_test` snippet, to create a boilerplate code file.

Write your mocha tests, as usual, using the RTA apis.

Be sure to call `

Note, we also have a `scripts/automated-tests/Utils.ts` file, with various helper methods, that simplify some of the RTA syntax. One can, of course, continue to use the richer RTA functions, when required; but it is advisable to use the simple syntax in most cases.

There is currently no remote-control recorder. This will be added to vscode over the next couple of months. However, with the snippets below, it is simple to write tests.

### snippets

To make life easier, snippets for common automated testing apis are provided, as follows

| Snippet                | Prefix          | Description                                      |
| ---------------------- | --------------- | ------------------------------------------------ |
| template_rta_test      | templatertatest | new test file                                    |
| rta_back               | rtaback         | send back key                                    |
| rta_backspace          | rtabackspace    | send backspace key                               |
| rta_down               | rtadown         | send down key                                    |
| rta_enter              | rtaenter        | send enter key                                   |
| rta_forward            | rtaforward      | send forward key                                 |
| rta_home               | rtahome         | send home key                                    |
| rta_left               | rtaleft         | send left key                                    |
| rta_ok                 | rtaok           | send ok key                                      |
| rta_options            | rtaoptions      | send options key                                 |
| rta_play               | rtaplay         | send play key                                    |
| rta_replay             | rtareplay       | send replay key                                  |
| rta_rewind             | rtarewind       | send rewind key                                  |
| rta_right              | rtaright        | send right key                                   |
| rta_search             | rtasearch       | send search key                                  |
| rta_up                 | rtaup           | send up key                                      |
| rta_sendText           | rtast           | send text                                        |
| rta_getfocusednode     | rtagfn          | get the focused node                             |
| rta_observeGlobalField | rtaogf          | observe a value on `global`                      |
| rta_observeSceneField  | rtaosf          | observe a value in the scene                     |
| rta_getGlobalValue     | rtaggv          | get a `global` value                             |
| rta_getSceneValue      | rtagsv          | get a value in the scene                         |
| rta_back               | rtaback         | send back key                                    |
| rta_wait               | rtaw            | wait for some ms, with helpful output in console |
| rta_logStep            | rtal            | logs the step your steps are performing          |

### Tips for writing RTA tests

- Have your screen use `robot.lib.utils.setAppReady()` method call, to indicate that the app is ready to test.
- Minimize your calls to `deployApp()`
- Recall you can clear the registry with `odc.deleteEntireRegistry()`
- Use the utils.ts methods in these snippets whenever possible, as it allows us to standardize behavior of tests
- Use `waitFor` calls to document what your test is doing, instead of extraneous comments
- Use `logStep` before all groups of commands, so it is easy to debug when running _and_ reading the test script

## Trouble shooting

### Test fails with error `Delete Failed: No such file or directory`

You receive an error such as:

````1) Login
       "before all" hook for "should login a user successfully":
     Error: Delete Failed: No such file or directory.
      at new FailedDeviceResponseError (node_modules/roku-deploy/dist/Errors.js:52:28)```
````

roku-deploy currently has a bug that prevents it from deploying if no app is already deployed.

To solve: navigate to your roku device, and manually sideload _any_ valid zip file. You can then continue to run automation tests

### Tests hang and do nothing, I am using WSL2 on windows

RTA (and other automated testing technologies), require that the roku device can send http requests and make socket connections to an express server, running on your local machine.

However, WSL2 does not have a bridged network, so the RTA server, which the tests require to function, is not visible outside of your WSL operating system (i.e. ubuntu).

In this case, we need to:

- open up ports in windows firewall, e.g. a range from 8000, so the RTA can choose an open port that windows will allow your roku device to see
- Edit the `scripts/automated-testing/wsl-host-port-forwarding.ps1` script
  - Change the ip address to be your window's machine's ip addres, on you _local_ network
- Run the script in an administrator powershell (e.g. press window key, type terminal, right click "open as administrator")

Once you have performed these steps, you will be able to run the automation tests from your local windows machine.
