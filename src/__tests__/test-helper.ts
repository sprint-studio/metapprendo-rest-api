import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {BlockchainRestApiApplication} from '..';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: process.env.PORT,
  });

  const app = new BlockchainRestApiApplication({
    rest: restConfig,
    basicAuthDisabled: true,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: BlockchainRestApiApplication;
  client: Client;
}
