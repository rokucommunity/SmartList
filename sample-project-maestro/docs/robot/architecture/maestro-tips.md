# Maestro tips
Be sure to read the [maestro documentation](https://georgejecook.github.io/maestro-roku/index.html)

## Classes, MVVM, MVC and models

- Embrace maestro class-driven development
- Write testable code, if you can _develop_ it in rooibos tests, you are saving everyone a ton of time and energy, not least of all yourself
- Extend relevant base classes:
  - View Models extend `robot.screens.BaseVM`
  - Models extend `robot.models.BaseModel`
  - Other classes (e.g. `AuthManager`, `AnalyticsManager`) extend `mc.BaseClass`
  - Cells extend `mv.BaseCell`
- Be aware of MVC `@nodeclass` semantics and nuances:
  - Public fields and functions will become interface fields and funcs on the generated xml: use private and protected members appropriately
  - Understand that MVC classes get _merged_ into the `m` of the generated xml component, and the lifecycle of lazy instantiated classes
  - Use `@lazy` classes when possible
  - `@debounce` fields that result in the same callback being called (e.g. if you have a button and several fields will be )
  - Use `@observerswaitinitialize` in your views to ensure they are fully instantiated before they start responding to observers
 - Use `@task` annotation to crate tasks from classes. This is easy to do, quick and above all, easy to test.


## XML bindings and MVVM

The maestro-roku-bsc-plugin allows us to parse xml files, and convert inline bindings into code. Again, this saves us error-prone boilerplate code, is more readable, more maintainable and facilitates more testability.
The plugin provides diagnostic feedback while you type, ensuring:
 - binding syntax is correct
 - bound fields exist
 - bound callback methods exist
 - parameters of callback methods match

Some tips:

 - Use `@eager` to make a binding fire straight away
 - Use `@lazy` to make a binding only fire later
 - Bindings can be placed on _fields_ in the xml components _interface_
 - `BaseViewModel` has a `getMField(name)` function you can use to get fields from your view's `m`
   - This is super handy when on a breakpoint in your vm, to help work out what the error is
 - You can (and should) bind to an interface defined function. e.g. for `mv_DynamicContainer` one binds to the view with `setNextView="{{currentView}}"`. In this case, when vm.currentView changes, maestro will callfunc invoke `setNextView` with the currentView value, on the dynamic container
 - If you think maestro is missing/mis-configuring bindings:
   - Check the output of the generated files in your build folder
   - Check the field/callback is, indeed, public
 - Be aware that maestro xml files need to be _touched_ if you update the vm, to update their diagnostic
 - Follow the [coding conventions](../development/coding-conventions.md)
