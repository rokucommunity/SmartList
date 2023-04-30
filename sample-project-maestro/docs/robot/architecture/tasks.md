# Tasks

This project uses the _maestro_ `@task` annotations to generate task xml and brs code.

This allows for writing tasks in a simple, familiar manner. Maestro documentation is [here](https://georgejecook.github.io/maestro-roku/Node%20Classes/node-task.html)

## Task pattern

Roku has 2 threads, render and task thread (strictly 3, _main_ too; but we just use that for launching SG or running unit tests).

The render thread is purely synchronous. To allow for async code, the render thread executes tasks.

For those with ajax, embedded systems, or RPC (RemoteProcedureCall) experience, the pattern is very familiar:

1. Instantiate a task node, using `m.runningTask = m.createTask(taskType, callback, fields)`
2. consume the result of the task in the calblack handler e.g. : `function callback(result as mc.Result)`
3. cancel a running task with `m.cancelTask(m.runningTask)`

Under the hood, the base classes are invoking the _maestro_ `mc.tasks.xxx` methods. They are proxied via methods to allow for easy mocking and stubbing.

### long lived tasks

We _avoid_ creating long-lived tasks whenever possible. They use resources, are tough to work with and maintain. It is much better to fire-and-forget transient tasks.

## Common tasks

| Task               | Description                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| mc_RequestTask     | Executes network events                                                                                                                 |
| LoadTask           | Loads feeds or other data, using data sources                                                                                           |
| AuthenticationTask | creates an `AuthenticationManager` and exectues the requisite methods, later returning a `mc.Result` object with the result of the task |
| AuthorizationTask  | creates an `AuthorizationManager` and exectues the requisite methods, later returning a `mc.Result` object with the result of the task  |
| RegistryTask       | Used for long running registry methods returning an `mc.Result` object with the result of the task                                      |
