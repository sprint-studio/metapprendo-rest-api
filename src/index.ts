import { RestServerConfig } from "@loopback/rest";
import { ApplicationConfig, BlockchainRestApiApplication } from "./application";
import { FabricService } from "./services";
export * from "./application";

export async function main(options: ApplicationConfig = {}) {
  const { CHANNEL_NAME, CHAINCODE_ID } = process.env;

  if (!CHANNEL_NAME || !CHAINCODE_ID) {
    throw new Error(
      "CHANNEL_NAME and/or CHAINCODE_ID are undefined, please add them into the environment variables."
    );
  }

  /**
   * Setup connection with Blockchain in Hyperledger Fabric
   */
  const fabricService = new FabricService("metapprendo");
  await fabricService.buildWallet();
  await fabricService.setupGateway();
  await fabricService.setChannel(CHANNEL_NAME);
  fabricService.setChaincode(CHAINCODE_ID);

  const app = new BlockchainRestApiApplication(options);
  await app.boot();

  /**
   * Put into the Applicaton Context the chaincode to use it in the controllers
   * through the Dependency Injection offered by Loopback
   */
  app.bind("microcredentialsChaincode").to(fabricService.contract);
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const rest: RestServerConfig = {
    // port: +(process.env.PORT ?? 3000),
    host: process.env.HOST,
    // The `gracePeriodForClose` provides a graceful close for http/https
    // servers with keep-alive clients. The default value is `Infinity`
    // (don't force-close). If you want to immediately destroy all sockets
    // upon stop, set its value to `0`.
    // See https://www.npmjs.com/package/stoppable
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
  };

  const config = { rest };
  main(config).catch((err) => {
    console.error("Cannot start the application.", err);
    process.exit(1);
  });
}
