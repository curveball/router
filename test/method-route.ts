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
  );
  // Fallback
  app.use( ctx => {

    ctx.response.body = '404';

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
    expect(response.body).to.equal('Method Not Allowed');
    expect(response.status).to.equal(405);

  });

});
