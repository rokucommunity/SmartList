# Authorization

## AuthorizationManager

Authorization is done via the `AuthorizationManager`:

- The manager is a _facade-proxy_ for the various _Authorization services_ which actually do the job of managing Authorization with the Evergent Authorization service, although this system is designed to be flexible enough that we could authorize content and purchases with other systems, too, in the future.
- It provides the methods:
  - 'loadProducts'
  - 'refresh'
  - 'restorePurchases'
  - 'purchases'
  - 'restoreAllPurchases'
- All methods, except for `restoreAllPurchases` the `id` of the service to use (default is `EvergentAuthorizationService`), so that the View Models, etc, which invoke the services they specifically need, yet the AuthorizationManager, acting in it's capacity as facade, can also orchestrate other strategies for analytics, persistence, etc, as required.
- Each service, in turn, updates the state of the `User`, and it's `AuthorizationInfo` objects, as required

## EntitlementInfo

The `EntitlementInfo` object, is the _source of truth_ for authorization state in the app, it contains/manages:

## EntitlementServices

These classes extend `robot.entitlement.service.BaseAuthorizationService` and override the various _"abstract"_ methods therein

## StoreEntitlementService

Allows for checking entitlements against the roku store