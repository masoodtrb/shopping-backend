// Masoud Torabi
import { Client, expect } from '@loopback/testlab';
import { ShoppingApplication } from '../..';
import { setupApplication } from './helper';

describe('HomePageController', () => {
  let app: ShoppingApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    const res = await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
    expect(res.body).to.match(/@loopback\/example\-shopping/);
  });

  it('exposes /openapi.json', async () => {
    const res = await client
      .get('/openapi.json')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body).to.containEql({
      openapi: '3.0.0',
    });
  });
});
