import { Application } from '@curveball/kernel';
import router from '../src/index.js';
import { expect } from 'chai';

describe('simple routes', async () => {

  const app = new Application();
  app.use(router('/foo', ctx => {

    ctx.response.body = 'Hello world';


  }));
  app.use(router('/pass', (ctx, next) => {

    ctx.state.pass = true;
    return next();

  }));
  // Fallback
  app.use( ctx => {

    if (ctx.state.pass) {
      ctx.response.body = 'passed through';
    } else {
      ctx.response.body = '404';
    }

  });

  it('should work', async () => {

    const response = await app.subRequest('GET', '/foo');
    expect(response.body).to.equal('Hello world');

  });

  it('should pass through if paths didn\'t match', async () => {

    const response = await app.subRequest('GET', '/not-found');
    expect(response.body).to.equal('404');

  });

  it('should allow passing on handling a request with next()', async() => {

    const response = await app.subRequest('GET', '/pass');
    expect(response.body).to.equal('passed through');

  });

  it('should support multiple middlewares', async () => {

    const app = new Application();
    app.use(router('/foo',
      (ctx, next) => next(),
      ctx => { ctx.response.body = 'Hello world'; }
    ));
    const response = await app.subRequest('GET', '/foo');
    expect(response.body).to.equal('Hello world');

  });

  it('should add the matched route to the context', async () => {

    let matchedRoute;
    const app = new Application();
    app.use(router('/foo/:id',
      (ctx, next) => next(),
      ctx => {
        matchedRoute = ctx.router?.matchedRoute;
        ctx.response.body = 'Hello world';
      }
    ));
    const response = await app.subRequest('GET', '/foo/1');
    expect(response.body).to.equal('Hello world');
    expect(matchedRoute).to.equal('/foo/:id');

  });

});
