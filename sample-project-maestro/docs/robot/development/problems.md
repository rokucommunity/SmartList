# Common problems

## I need to update my npm/ropm package versions

The safest way to do this is:
 - update `package.json` to have the correct package versions for the dependencies
 - `rm -rf node_modules`
 - `rm package-lock.json`
 - `npm i`
 - In vscode try:
   - [COMMAND PALETTE]: `restart language server`
   - If intellisense does not return, _restart vscode_ (i.e. [COMMAND PAELETTE]: `reload window`)

## Roku package is not installing
 - Is the ip address and password correctly set in `.vscode/.env`?
 - Is your device in [developer mode](https://blog.roku.com/developer/developer-setup-guide)?
 - Does your device need an update? (go to settings, system, check for updates)
 - Is a debug session running in another instance of vscode/some other roku app/telnet?
 - Restart your device _and_ vscode

## Maestro is showing that plugin modules cannot be found
 - Usually means that the bsc compiler (or dependencies are out of sync with the plugin)
 - Get latest from main, and reinstall packages as per instructions above

## I have no colors in my log console

Be sure to install the IBM colorizer extension (see [suggested extensions](suggested-extensions.md) for a complete list)

### I'm getting lots of really weird errors that don't make sense!
- Run `npm install` again
- Reload your VSCode window by using `CMD-Shift-P` and typing "Reload Window"

# I need to debug a deployed pkg; but there's no log output!

Sometimes you will have to get debug information from a packaged app, for example if you need to get store receipts, or debug roku pay scenarios. There is no telnet output for pkg deployed apps; but fear not! roku-log has a provision for this: the `HTTPTransport`. Use it as follows:
 - In this case, you can quickly create a dev deploy package with `npm run pkg-dev` and then upload that to the channel store
 - Note the ip address of your dev machine, on your network, ensure port 8000 is open and run `npm remote-logger`
 - Upload the app via the roku channel store
 - Update your device to get the latest binary
 - Run the app
 - In RALE, ensure that the ip address in `MainScene.__mioc.appConfig.debug.logging.httpLoggingURL` is set to the ip address of your dev machine running the remote-logger
 - In the dev menu, go to `APP DEBUG SETTINGS` and turn on `HTTP LOGGING`
