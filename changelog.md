Changelog
=========

0.3.0-beta.0 (2020-01-19)
-------------------------

* Support for multiplewares per route.
* Route parameters are now available on `ctx.params` and are now typed.
  `ctx.state.params` is also still available, but will be removed in a future
  major version.
* Typescript target is now es2019 instead of esnext to ensure that older
  Node.js versions are supported.
* No longer using `path-match`, which was deprecated. Instead, we're using
  `path-to-regexp` directly.
* Switched from tslint to eslint.


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
