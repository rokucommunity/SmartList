# Setup

## Prerequisites:

- Mac OS X, Windows or Linux machine for development and testing
  - If using Windows, you should be developing in an ubuntu [WSL 2 environment](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
- Nodejs version 15.11 or higher
- Roku device with [developer mode enabled](<(https://blog.roku.com/developer/developer-setup-guide)>)
- Roku hardware, second generation or newer
- Roku firmware version 9.0 or later
- vscode ide
- libJpeg
  - mac: `brew install libjpeg`
  - linux: `sudo apt-get install libjpeg-dev`

## Setting up your dev environment

1.  Install vscode and ensure the command line integration is enabled
1.  Install the [brighterscript extension](https://marketplace.visualstudio.com/items?itemName=RokuCommunity.brightscript)
1.  Install [these extensions](suggested-extensions.md), so that you have uniform coloring, and IDE features, with the rest of the team
1.  `npm run update-schema` - This will update xsd information that vscode needs for xml code-completion
1.  `code .` - Open vscode in this folder
1.  Copy `.vscode/example.env` to `.vscode/.env`
2.  Update `.env` file to use your roku's ip address and password (is it really not `aaaa`? ;) )
3.  Copy `bsconfig-test.json` to `bsconfig-tdd.json` - this allows you to tweak which tests are compiled when doing Test Driven Development
4.  Run the `Run`, `Test`, `Tdd` or `Run prod` dev targets
5.  Install the RALE tool from [here](https://drive.google.com/drive/folders/1gZZcndEpSO6zDVkx09UpYJtPb7OTf6Nq?usp=sharing).
   - Note - we use a specific version of the tool, which matches our RALETracker task version. Our version of the RALETrackerTask includes many optimizations. We should not update to new versions of RALE, without prior agreement and acting in concert first: it will require updating the RALETracker task, and may introduce new bugs - roku almost never innovate on this tool, sadly (closed source, too, so we can't innovate either), so it's unlikely there's anything worth the pain of updating regularly, if at all :/

## VSCode launch targets

| Target         | Description                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| run            | Launches developer build (adds extra log line numbers, enables RALE, uses dev environment)                         |
| run prod       | Launches developer build (strips log lines, disables RALE, uses prod environment)                                  |
| run (no build) | Relaunches a debug session with no compiler step - useful for rapidly iterating on node-code changing debug cycles |
| tests          | builds and launches in test mode                                                                                   |
| tdd          | builds and launches in tdd testing mode, which only compiles your open .spec.bs files                                                                                   |

## Debug flags, and controlling your dev environment
You can duplicate `src/meta/DebugFlags.json`, and copy it into `src-dev/meta/DebugFlags.json`. The file is git ignored, so you can make any changes without fear of breaking something in a released build.
When you build with the `build-dev` command, or `pkg-dev` command, or with the `Run` launch target, these debug flags will be used, allowing you to tailor the app to your own requirements.
