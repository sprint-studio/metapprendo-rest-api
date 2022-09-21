import { BootMixin } from "@loopback/boot";
import { ApplicationConfig as DefaultConfig } from "@loopback/core";
import { RepositoryMixin } from "@loopback/repository";
import { OASEnhancerBindings, RestApplication } from "@loopback/rest";
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from "@loopback/rest-explorer";
import { ServiceMixin } from "@loopback/service-proxy";
import path from "path";
import authMiddleware from "./middleware/authentication.middleware";

type ApplicationConfig = DefaultConfig & {
  basicAuthUsername?: string;
  basicAuthPassword?: string;
  basicAuthDisabled?: boolean;
};
export { ApplicationConfig };

export class BlockchainRestApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig) {
    super(options);

    const {
      basicAuthUsername = process.env.BASIC_AUTH_USERNAME ?? "",
      basicAuthPassword = process.env.BASIC_AUTH_PASSWORD ?? "",
      basicAuthDisabled = true || process.env.DISABLE_AUTH === "true",
    } = options;

    this.middleware(
      authMiddleware(basicAuthUsername, basicAuthPassword, basicAuthDisabled)
    );

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer",
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    path.resolve(__dirname, "app/server");
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
    };
  }

  // define a function to return a spec service by the same key
  getSpecService() {
    return this.get(OASEnhancerBindings.OAS_ENHANCER_SERVICE);
  }
}
