import {Client, expect} from '@loopback/testlab';
import {BlockchainRestApiApplication} from '../..';
import {setupApplication} from '../test-helper';

describe('The API Docs HTML document', () => {
  let app: BlockchainRestApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('is reachable on /docs.html', async () => {
    const res = await client.get('/docs.html').expect(200);
    expect(res.text).to.containEql("openapi.json");
  });

  it('references a valid openapi.json file', async () => {
    const res = await client.get('/openapi.json').expect(200);
    expect(res.text).to.containEql(`"openapi": "3.0.0"`);
  });
});
