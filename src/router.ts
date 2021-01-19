import { Context, invokeMiddlewares, Middleware } from '@curveball/core';
import { MethodNotAllowed } from '@curveball/http-errors';
import * as http from 'http';
import { match } from 'path-to-regexp';

type Dispatcher = {

  delete: (mw: Middleware) => Dispatcher;
  get: (mw: Middleware) => Dispatcher;
  head: (mw: Middleware) => Dispatcher;
  options: (mw: Middleware) => Dispatcher;
  patch: (mw: Middleware) => Dispatcher;
  post: (mw: Middleware) => Dispatcher;
  put: (mw: Middleware) => Dispatcher;

} & Middleware;

/**
 * The route function creates a route middleware.
 *
 * Pass a path and a middleware. The passed midldleware will be called if the
 * path matched.
 *
 * Example:
 *
 * app.use(route('/foo/bar', (ctx, next) => {
 *
 *   // This middleware will get called if the route matched.
 *
 * });
 */
export default function route(path: string, middleware: Middleware): Middleware;
export default function route(path: string): Dispatcher;
export default function route(path: string, middleware?: Middleware): Middleware {

  if (typeof middleware === 'undefined') {
    return methodRoute(path);
  } else {
    return anyMethodRoute(path, middleware);
  }

}

function anyMethodRoute(path: string, middleware: Middleware): Middleware {

  const m = match(path);

  return (ctx, next) => {

    const result = m(ctx.path);
    if (result === false) {
      return next();
    }

    ctx.params = result.params as Record<string, string>;
    // This is deprecated
    ctx.state.params = result.params;

    return invokeMiddlewares(
      ctx,
      [
        middleware,
        () => next()
      ]
    );

  };

}

function methodRoute(path: string): Dispatcher {

  const m = match(path);
  const perMethodMw: { [method: string]: Middleware } = {};
  const dispatcher: any = (ctx: Context, next: () => Promise<void>) => {

    const result = m(ctx.path);
    if (result === false) {
      // Path did not match
      return next();
    }

    ctx.params = result.params as Record<string, string>;
    // This is deprecated
    ctx.state.params = result.params;


    if (perMethodMw[ctx.method] === undefined) {
      throw new MethodNotAllowed();
    }

    return invokeMiddlewares(ctx, [
      perMethodMw[ctx.method],
      () => next()
    ]);

  };
  for (const method of http.METHODS) {

    dispatcher[method.toLowerCase()] = (methodMw: Middleware) => {

      perMethodMw[method] = methodMw;
      return dispatcher;

    };

  }

  return dispatcher;

}
