import { Application } from '@curveball/core';
import router from '../src';
import { expect } from 'chai';

describe('method-based routes', async () => {

  const app = new Application();
  app.use(router('/foo/:id')
    .get( ctx => {
      ctx.response.body = 'GET /foo/' + ctx.state.params.id;

    })
    .post( ctx => {
      ctx.response.body = 'POST /foo/' + ctx.state.params.id;
    })
    .delete( (ctx, next) => {
      ctx.state.blaw = 'sup';
      return next();
    })
  );
  // Fallback
  app.use( ctx => {

    if (ctx.state.blaw === 'sup') {
      ctx.response.body = 'passed through';
    } else {
      ctx.response.body = '404';
    }

  });

  it('should work', async () => {

    const response = await app.subRequest('GET', '/foo/1');
    expect(response.body).to.equal('GET /foo/1');

  });

  it('should pass through if paths didn\'t match', async () => {

    const response = await app.subRequest('GET', '/not-found');
    expect(response.body).to.equal('404');

  });

  it('should set the status to 405 if a route matched, but a method didnt', async () => {

    const response = await app.subRequest('PUT', '/foo/1');
    expect(response.status).to.equal(405);

  });

  it('should allow a method passing on handling a request with next()', async() => {

    const response = await app.subRequest('DELETE', '/foo/1');
    expect(response.body).to.equal('passed through');

  });

  it('should support multiple middlewares', async() => {

    const app2 = new Application();
    app2.use(router('/foo/:id')
      .get(
        (ctx, next) => {
          return next();
        },
        ctx => {
          ctx.response.body = 'GET /foo/' + ctx.state.params.id;
        })
    );
    const response = await app2.subRequest('GET', '/foo/1');
    expect(response.body).to.equal('GET /foo/1');

  });

  it('should add the matched route to the context', async() => {

    let matchedRoute = '';
    const app2 = new Application();
    app2.use(router('/foo/:id')
      .get( ctx => {
        matchedRoute = ctx.router.matchedRoute;
        ctx.response.body = 'GET /foo/' + ctx.state.params.id;

      })
    );
    const response = await app2.subRequest('GET', '/foo/1');
    expect(response.body).to.equal('GET /foo/1');
    expect(matchedRoute).to.equal('/foo/:id');

  });

});
