# Brighterscript and Brighterscript classes

This project uses several features of [brighterscript](https://github.com/rokucommunity/brighterscript):

 - classes - `class LoginScreenVM extends robot.BaseVM`
 - import directives - `import "pkg:/source/screens/LoginScreenVM.bs`
 - namespaces - `namespace robot.utils`
 - annotations  - `@nodeclass`, `@debounce`
 - callfunc operator `@.` -
 - template strings - `` label.text = `my ${"template"} string` ``
 - ternary operator -  `label.text = user.isLoggedIn ? user.name : "guest"`
 - null coalescence operator - `label.text = usernameText ?? "anonymous"`

These features allow us to save on maintenance and boilerplate code, and therefore have less risk of regression, or other bugs.

Brighterscript is a superset of brightscript, in the same vein as typescript is for javascript. The `bsc` compiler compiles our `.bs` brighterscript files into `.brs` brightscript files.

## Brighterscript provides class inheritance. As such we embrace OOAD:
- Create and extend appropriate base classes
- Use appropriate access modifiers for your class members (public|private|protected)
- Override methods where appropriate
- Use design patterns where appropriate
