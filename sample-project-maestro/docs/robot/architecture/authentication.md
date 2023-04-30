# Authentication

Authentication is done via the `AuthenticationManager`:

- The manager is a _facade-proxy_ for the various _authentication services_ which actually do the job of managing authentication with the various services (e.g. robot email auth services, tve, etc)
- It provides methods for `login`, `logout` and `refresh`
- Each method specifies the `id` of the service to use, so that the View Models, etc, which invoke the services they specifically need, yet the AuthenticationManager, acting in it's capacity as facade, can also orchestrate other strategies for analytics, persistence, etc, as required.
- Each service, in turn, updates the state of the `User`, and it's `AuthenticationInfo` objects, as required

## AuthenticationInfo

These NodeClasses, store information about the auth state (jwt, refreshToken, time to expiry, etc), and provide basic functionality for checking validity and serializing/deserializing.

## AuthenticationServices

These classes extend `robot.authentication.service.BaseAuthenticationService` and override the various _"abstract"_ methods therein

## TBD

add more services