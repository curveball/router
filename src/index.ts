// @ts-ignore: Ignore not having this definition for now
import pathMatch from 'path-match';
import { Middleware, Context } from '@curveball/core';
import http from 'http';

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
export default function route(path: string, middleware: Middleware) : Middleware;
export default function route(path: string) : Dispatcher;
export default function route(path: string, middleware?: Middleware) : Middleware {

  if (typeof middleware === 'undefined') {
    return methodRoute(path);
  } else {
    return anyMethodRoute(path, middleware);
  }

}

function anyMethodRoute(path: string, middleware: Middleware): Middleware {

  const match = pathMatch()(path);

  return (ctx, next) => {

    const params = match(ctx.request.path);
    if (params===false) {
      return next();
    }
    ctx.state.params = params;
    return middleware(ctx, next);

  };

};

function methodRoute(path: string): Dispatcher {

  const match = pathMatch()(path);
  const perMethodMw:{ [method: string]: Middleware } = {};
  const dispatcher:any = (ctx: Context, next: () => Promise<void>) => {

    const params = match(ctx.request.path);
    if (params === false) {
      // Path did not match
      return next();
    }

    ctx.state.params = params;
    if(perMethodMw[ctx.request.method] === undefined) {
      // There was no middleware for this method
      ctx.response.status = 405;
      ctx.response.body = 'Method Not Allowed';
      return;
    }

    return perMethodMw[ctx.request.method](ctx, next);

  };
  for(const method of http.METHODS) {

    dispatcher[method.toLowerCase()] = (methodMw: Middleware) => {

      perMethodMw[method] = methodMw;
      return dispatcher;

    }

  }

  return dispatcher;

}
