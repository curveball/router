import { Context, invokeMiddlewares, Middleware } from '@curveball/core';
import { MethodNotAllowed } from '@curveball/http-errors';
import * as http from 'http';
import { match } from 'path-to-regexp';
import './declarations';

type DispatcherFunc = (mw: Middleware, ...mws: Middleware[]) => Dispatcher;
type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';
type Dispatcher = Record<Methods, DispatcherFunc> & Middleware;

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
export default function route(path: string, middleware: Middleware, ...middlewares: Middleware[]): Middleware;
export default function route(path: string): Dispatcher;
export default function route(path: string, ...middlewares: Middleware[]): Middleware {

  if (middlewares.length === 0) {
    return methodRoute(path);
  } else {
    return anyMethodRoute(path, ...middlewares);
  }

}

function anyMethodRoute(path: string, ...middlewares: Middleware[]): Middleware {

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
        ...middlewares,
        () => next()
      ]
    );

  };

}

function methodRoute(path: string): Dispatcher {

  const m = match(path);
  const perMethodMws: { [method: string]: Middleware[] } = {};
  const dispatcherMw: Middleware = (ctx: Context, next: () => Promise<void>) => {

    const result = m(ctx.path);
    if (result === false) {
      // Path did not match
      return next();
    }

    ctx.params = result.params as Record<string, string>;
    // This is deprecated
    ctx.state.params = result.params;


    if (perMethodMws[ctx.method] === undefined || perMethodMws[ctx.method].length === 0) {
      throw new MethodNotAllowed();
    }

    return invokeMiddlewares(ctx, [
      ...perMethodMws[ctx.method],
      () => next()
    ]);

  };

  const dispatcher: Dispatcher = Object.assign(
    dispatcherMw,
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    {} as Record<Methods, DispatcherFunc>
  );
  for (const method of http.METHODS) {

    dispatcher[method.toLowerCase() as Methods] = (...mws: Middleware[]) => {

      perMethodMws[method] = mws;
      return dispatcher;

    };

  }

  return dispatcher;

}
