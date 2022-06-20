Changelog
=========

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
-----------------

* Updated to latest curveball API.


0.0.1 (2018-07-01)
------------------

* First version
