import {
  Wallets,
  Gateway,
  X509Identity,
  Wallet,
  Network,
  Contract,
} from "fabric-network";
import fs from "fs";

import { FabricConnectionConfig } from "../config";

export class FabricService {
  private TLS_CERT: string;
  private CLIENT_KEY: string;
  private CLIENT_CERT: string;
  private identityName: string;
  private wallet: Wallet;
  private gateway: Gateway;
  private _channel: Network;
  private _contract: Contract;

  constructor(identityName?: string) {
    const { TLS_CERT_PATH, CLIENT_KEY_PATH, CLIENT_CERT_PATH } = process.env;

    if (!CLIENT_CERT_PATH || !CLIENT_KEY_PATH || !TLS_CERT_PATH) {
      throw new Error(
        "Please provide environment variables CLIENT_CERT_PATH, CLIENT_KEY_PATH and TLS_CERT_PATH "
      );
    }

    this.TLS_CERT = fs.readFileSync(TLS_CERT_PATH, {
      encoding: "utf8",
      flag: "r",
    });

    this.CLIENT_CERT = fs.readFileSync(CLIENT_CERT_PATH, {
      encoding: "utf8",
      flag: "r",
    });

    this.CLIENT_KEY = fs.readFileSync(CLIENT_KEY_PATH, {
      encoding: "utf8",
      flag: "r",
    });

    this.identityName = identityName ?? "metapprendo";
  }

  async buildWallet() {
    this.wallet = await Wallets.newInMemoryWallet();

    const identity: X509Identity = {
      credentials: {
        certificate: this.CLIENT_CERT,
        privateKey: this.CLIENT_KEY,
      },
      // TODO must be documented that must be MetApprendo
      mspId: "MetApprendo",
      type: "X.509",
    };

    await this.wallet.put(this.identityName, identity);
  }

  async setupGateway() {
    this.gateway = new Gateway();
    const fabricConnectionConfig = FabricConnectionConfig(this.TLS_CERT);

    await this.gateway.connect(fabricConnectionConfig, {
      wallet: this.wallet,
      identity: this.identityName,
      discovery: { enabled: true, asLocalhost: false }, // using asLocalhost as this gateway is using a fabric network deployed locally
    });
  }

  get channel() {
    return this._channel;
  }

  get contract() {
    return this._contract;
  }

  public async setChannel(channelName: string) {
    this._channel = await this.gateway.getNetwork(channelName);
  }

  public setChaincode(chaincodeId: string) {
    if (!this._channel) {
      throw new Error(
        "The channel is undefined! Call 'retrieveChannel' before retrieving the chaincode from the network"
      );
    }

    this._contract = this.channel.getContract(chaincodeId);
  }
}
