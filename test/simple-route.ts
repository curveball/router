import { Application } from '@curveball/core';
import router from '../src';
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


});
