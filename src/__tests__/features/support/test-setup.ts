/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-invalid-this */
import { Application } from "@loopback/core";
import { Client } from "@loopback/testlab";
import { binding, before, beforeAll, after, afterAll } from "@lynxwall/cucumber-tsflow";
import fs from 'node:fs/promises';

import { User } from "../../../models";
import { setupApplication } from "../../test-helper";

@binding()
export class TestSetup {
  protected app: Application;
  protected client: Client;
  protected response: any;
  protected error: any;
  protected user: Partial<User>;
  protected requestBody: any;

  @beforeAll()
  public async beforeAllScenarios() {
    await fs.mkdir(`${process.env.FILE_ROOT_PATH}/user1/activity1/certifications`, { recursive: true });
    await fs.writeFile(`${process.env.FILE_ROOT_PATH}/user1/activity1/certifications/a.svg12345678`, Buffer.from("Y29udGVudGFzdmc=", "base64"))
    await fs.mkdir(`${process.env.FILE_ROOT_PATH}/user1/activity1/files`, { recursive: true });
    await fs.writeFile(`${process.env.FILE_ROOT_PATH}/user1/activity1/files/c.svg12345678`, Buffer.from("Y29udGVudGNzdmc=", "base64"))
    await fs.mkdir(`${process.env.FILE_ROOT_PATH}/user1/activity1/endorsements`, { recursive: true });
    await fs.writeFile(`${process.env.FILE_ROOT_PATH}/user1/activity1/endorsements/b.svg12345678`, Buffer.from("Y29udGVudGJzdmc=", "base64"))
  }

  @before()
  public async f() {
    const { app, client } = await setupApplication();

    this.app = app;
    this.client = client;
  }

  @afterAll()
  public async afterAllScenarios() {
    await fs.rm(`${process.env.FILE_ROOT_PATH}/user1`, { recursive: true });
  }

  @after()
  public async after() {
    await this.app.stop();
  }
}
