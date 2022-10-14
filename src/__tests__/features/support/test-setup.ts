/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@loopback/core";
import { Client } from "@loopback/testlab";
import { should } from "chai";
import { before, after, binding } from "cucumber-tsflow";
import { User } from "../../../models";

/* eslint-disable @typescript-eslint/no-invalid-this */
import { setupApplication } from "../../test-helper";

should();

@binding()
export default class TestSetup {
  protected app: Application;
  protected client: Client;
  protected response: any;
  protected error: any;
  protected user: Partial<User>;

  @before()
  public async beforeAllScenarios() {
    const { app, client } = await setupApplication();

    this.app = app;
    this.client = client;
  }

  @after()
  public async afterAllScenarios() {
    await this.app.stop();
  }
}
