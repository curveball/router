Changelog
=========

2.0.0 (????-??-??)
------------------

* Updated path-to-regexp from 6 to 8.1, to fix a security vulnerability.
  Unfortunately the supported syntax for path-to-regexp has changed slightly
  for complex routes, so this is a breaking change. Most common simple routes
  will not be affected. For more information consult the path-to-regexp
  changelog: https://github.com/pillarjs/path-to-regexp/releases


1.0.0 (2024-01-16)
------------------

* Finally! Curveball v1. Only took 6 years.
* CommonJS support has been dropped. The previous version of this library
  supported both CommonJS and ESM. The effort of this no longer feels worth it.
  ESM is the future, so we're dropping CommonJS.
* Now requires Node 18.
* Upgraded to Typescript 5.3.


0.6.0 (2023-02-15)
------------------

* This package now supports ESM and CommonJS modules.
* No longer supports Node 14. Please use Node 16 or higher.


0.5.0 (2022-09-03)
------------------

* Upgraded from `@curveball/core` to `@curveball/kernel`.


0.4.2 (2022-09-03)
------------------

* This package now adds a `router.matchedRoute` property to `Context`. This
  property will contain the (last) used route and might be useful for logging
  purposes. (@mhum).


0.4.1 (2022-06-20)
------------------

* Require @curveball/core 0.19 in peerDependencies.


0.4.0 (2022-06-20)
------------------

* Requires Node 14 and up, and curveball/core 0.19 and up.


0.3.0 (2021-02-01)
------------------

* Every route can now supply multiple middlewares, which will run in order.
* Instead of `ctx.state.params`, params are now set in `ctx.params` and have
  stronger typing. The old `ctx.state.params` still work, but will be removed
  in a future version.
* Typescript target is now es2019 instead of esnext to ensure that older
  Node.js versions are supported.


0.2.4 (2020-01-05)
------------------

* Allow installation on Curveball 0.10.


0.2.3 (2019-10-30)
------------------

* `@curveball/core` is now a peerDependency, making it easier to upgrade.


0.2.2 (2019-09-13)
------------------

* Updated to Curveball 0.9.0 API.


0.2.1 (2019-03-30)
------------------

* Updated to work with controller-style middlewares.
* Updated dependencies.


0.2.0 (2018-10-04)
------------------

* Updated to latest curveball API.


0.1.0 (2018-09-04)
------------------

* Updated to latest curveball API.


0.0.1 (2018-07-01)
------------------

* First version
