# continuous integration

# Running CI builds

CI builds are run on nightly builds, and whenever a pr is pushed.

The ci can also be run manually, by:

1. Set the following env vars in your profile

```
export ROKU_DEVICE=[IP_OF_ROKU]
export ROKU_DEVICE_PASSWORD=[PASSWORD_OF_ROKU]
```
2. run `npm run ci`

## Overview

The `scripts/ci` folder contains scripts that pertain to the continuous integration process.

The `ci` npm task (i.e. `npm run ci`) is triggered as part of the azure pipelines for pr builds and nightly builds, and in turn invokes `run-ci.ts` (compiled), which:

- builds and runs unit tests
- builds and runs the automation testing client (i.e. prod version of the app, which includes automation testing library files)
- builds
  - dev
  - qa
  - prod
- packages
  - qa
  - prod

## Remote roku device

The CI build runs against a remotely hosted roku device. This roku device is port-forwarded to a public server, over secure ssh. One of the team, with access to the server, and a local device, runs the `tunnel.sh` script, in terminal, which setups up the required ssh forwards.

## Controlling the CI build

You can configure the CI build, locally or on azure, by setting environment variables (in your shell environment for the former, or by editing the azure variable groups: [Roku-PR-Check](https://dev.azure.com/robotdev/DTC/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=99&path=Roku-PR-Check) or [Roku-Nightly-Build](https://dev.azure.com/robotdev/DTC/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=100&path=Roku-Nightly-Build), for the latter).

The CI build then has the following environment variables set:
 - ROKU_DEVICE - domain name/ip of the remote roku ssh tunnel server
 - ROKU_DEVICE_PASSWORD - password of roku device
 - TEST_TIMEOUT_SECONDS - number of seconds to wait for the test to timeout without detecting success/fail
 - OPTIMIZE_IMAGES - if set to true, then the ci build will commpress all images
 - DISABLE_AUTOMATED_TESTS - if set, then the ci build will not run automated tests
 - DISABLE_UNIT_TESTS - if set, then the ci build will not run unit tests
 - DISABLE_PACKAGING - if set, then the ci build will not rekey and package the build
 - SHOW_FULL_TEST_OUTPUT - if set to true, then the ci will show all the output from the test. This can slow test execution considerably.


## Unit tests

Unit tests are executed by running the test build produced by `npm run build-test` script, against the forwarding server.
The tests fail if the overall status is error, or if the build times out/crashes

## Automated tests

For more info, see [automated testing](automated-testing.md)