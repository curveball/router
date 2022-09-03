Curveball Router
================

This package is a simple router for [Curveball][1].

Installation
------------

    npm install @curveball/router


Getting started
---------------

The simplest, and recommended form works as follows:

```typescript
import { Application } from '@curveball/kernel';
import router from '@curveball/router';

const app = Application();
app.use(
  router('/foo/:id', ctx => {
    // the 'id' is available via ctx.params.id
  })
);
```

It's also possible to do per-method routing, using the following syntax.

```typescript
import { Application } from '@curveball/kernel';
import router from '@curveball/router';

const app = Application();
app.use(
  router('/foo/:id')
    .get( ctx => { /* GET requests */ })
    .post( ctx => { /* POST requests */ })
);
```

You can either specify 1, or multiple middlewares. The following example runs
2 fictional middlewares on a route.

```typescript
const app = Application();

const route = router(
  '/foo/:id',
  myAuthMiddleware,
  myBodyparser,
  ctx => {
    ctx.response.body = 'success!';
  }
);

app.use(route);
```

Access matched route in other middleware
---------------
The matched route is added into the Curveball context for other middleware to access
if they need (such as for access request logging). It will be accessible after the
router has executed.

```typescript
import { Application, Context } from '@curveball/kernel';
import router from '@curveball/router';

const app = Application();
app.use(async (ctx: Context, next) => {
  await next();

  // Will be '/foo/:id'
  const matchedRoute = ctx.router?.matchedRoute;
});

app.use(
  router('/foo/:id', ctx => {
    ctx.response.body = '/foo/' + ctx.state.params.id;
  });
);
```


[1]: https://github.com/curveball/
[2]: https://github.com/koajs/path-match
