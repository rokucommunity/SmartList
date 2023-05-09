# Architecture

## Overview

This project uses [maestro framework](https://github.com/georgejecook/maestro). The following features are used:
  - Base view classes (`BaseView`, `BaseScreen`)
  - Observable classes (`BaseObservable`, `BaseViewModel`)
  - Container views (`TabbedController`, `NavigationController`, etc)
  - Maestro lifecycle mixins methods (`KeyMixin`, `FocusMixin`)
  - XML bindings
  - IOC mechanism
  - Node classes

Please familiarize yourself with maestro framework _before_ reading the rest of this document.

## Contents
 - [Brighterscript](brighterscript.md)
 - [maestro-tips](brighterscript.md)
 - [Files and Folders](files-and-folders.md)
 - [Common Models and managers](common-models.md)
 - [Entitlements](entitlements.md)
 - [Authorization](authorization.md)
 - [VideoPlayer](video-player.md)
 - [Tasks](tasks.md)


## MVC

This channel uses [MVC pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). In this pattern, we aim for maximum testability, without the need to launch the app and navigate the UI to test functionality, by leveraging maestro node classes.

The pattern is straight forward, for every view you have:

 - Controller - extends `BaseView`, or `BaseScreen`, and contains the properties which the view binds to - this class is extensively tested
 - Model - these are the collections we display
 - View - typically described in json bundle files, or delivered from the tantawowa roku-robot metadata
 -
## Main views
The application has the following main views:

| View | Description |
|---|---|
|main.bs|Loads the `MainScene`|
|MainScene|The app's only scene. It manages the initial bootstrap tasks, owns, and is responsible for displaying the `AppController`|
|AppController|This is the app's main View. It owns the app's `TabController` and menu|
|VideoPlayer|TBD|
|DeepLinkController|TBD|
|TabController|This is a _maestro_ aggregate view, which This project uses to display for each menu option available in the app. Each child is a `TabChildScreen`, with it's own `NavigationController`|
|NavMenu|The Main app menu|

## Important models

| Model | Description |
|---|---|

TBD

## Important classes

| Class | Description |
|---|---|

TBD

## Dependency injection

This project uses maestro's mioc utilities to set and get instances (i.e. via `mioc.getInstance("user")` or `mioc.setInstance("user", userObject)`). We also wrap these calls in our base classes allowing us to easily mock these calls in our unit tests (i.e. `m.getInstance...`, `m.setInstance...`)

## Application launch sequence

The sequence is:

 1. `Main.bs`: Creates `MainScene`, then invokes `MainScene.begin()`
 2. `MainScene`: initializes rLog framework, initializes maestro framework, ioc container, and waits for the `BootstrapSequence` to finish
 5. `MainScene`: upon receiving the _complete_ flag calls `startApp()`, which creates a `AppController`
 7. `AppController`: Checks if deep linking is required (this is further described in the following section), and if so enters deeplinking, and if not shows the home screen.

## Deep Linking

### Overview

Deep linking follows roku's deeplinking norms: i.e. the deep linking is configured, either at app launch, or later via a roInput event, by receiving the following args:

contentId: an arbitrary identifier, which we provide (for channel certification testing, at the very least, and/or as part of a search feed)
mediaType: one of the following. (none|movie|short-form|live|special|episode|series|season)

A full explanation of the expected behavior can be found here: https://developer.roku.com/docs/developer-program/discovery/implementing-deep-linking.md

### Technical implementation

This project uses a standard pattern, which I have used on various clients, and has worked to extremely well. It is robust, encapsulated, and scales with player, and monetization features. It does not pollute the application.

Our pattern comprises of

- a `DeepLinkingArgs`, which is constructed by the `AppController`, in response to app launch, or roInput events
- the `DeeplinkController` (and, of course, associated ViewModel) - this is responsible for
  - processing the deeplinking args, and loading any content that is required
  - ascertaining which screens to show (i.e detail and/or video playback screen)
  - displaying those screens
  - gracefully handling errors (and in other apps/in the future, handling pay-walls, entitlements and authorization)

The `AppController` simply pushes the `DeeplinkController` onto the stack. This allows for us to firewall the deeplinking experience, and maintain the app state, in the case of live deep links (i.e. roInput links)
