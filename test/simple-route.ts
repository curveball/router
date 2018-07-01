import { Application } from '@curveball/core';
import router from '../src';
import { expect } from 'chai';

describe('simple routes', async () => {

  const app = new Application();
  app.use(router('/foo', ctx => {

    ctx.response.body = 'Hello world';
    

  }));
  // Fallback
  app.use( ctx => {

    ctx.response.body = '404';

  });

  it('should work', async () => {

    const response = await app.subRequest('GET', '/foo');
    expect(response.body).to.equal('Hello world');

  });

  it('should pass through if paths didn\'t match', async () => {

    const response = await app.subRequest('GET', '/not-found');
    expect(response.body).to.equal('404');

  });

});
