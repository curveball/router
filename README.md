Curveball Router
===============

[![Greenkeeper badge](https://badges.greenkeeper.io/curveballjs/router.svg)](https://greenkeeper.io/)

This package is a simple router for [Curveball][1]. It's heavily inspired by
[koa-path-match][2].


Installation
------------

    npm install @curveball/router


Getting started
---------------

The simplest, and recommended form works as follows:

```typescript
import { Application } from '@curveball/core';
import { router } from '@curveball/router';

const app = Application();
app.use(
  router('/foo/:id', ctx => {
    // the 'id' is available via ctx.state.params.id
  })
);
```

It's also possible to do per-method routing, using the following syntax.

```typescript
import { Application } from '@curveball/core';
import { router } from '@curveball/router';

const app = Application();
app.use(
  router('/foo/:id')
    .get( ctx => { /* GET requests */ })
    .post( ctx => { /* POST requests */ })
);
```

[1]: https://github.com/curveballjs/
[2]: https://github.com/koajs/path-match
