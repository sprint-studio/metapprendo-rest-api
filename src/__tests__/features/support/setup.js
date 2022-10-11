/* eslint-disable @typescript-eslint/no-invalid-this */
const { After, Before, BeforeStep, AfterStep } = require('@cucumber/cucumber');
const { setupApplication } = require('../../test-helper');
const fs = require('node:fs/promises');
require('chai').should()

const { parallelCanAssignHelpers, setParallelCanAssign } = require('@cucumber/cucumber');

const { atMostOnePicklePerTag } = parallelCanAssignHelpers
const myTagRule = atMostOnePicklePerTag(["@filesysmte"]);

// Only one pickle with @tag1 can run at a time
//   AND only one pickle with @tag2 can run at a time
setParallelCanAssign(myTagRule)


BeforeStep({ tags: "@filesystem" }, async () => {
  await fs.mkdir(`${process.env.FILE_ROOT_PATH}/user1/activity1/certifications`, { recursive: true });
  await fs.mkdir(`${process.env.FILE_ROOT_PATH}/user1/activity1/endorsements`, { recursive: true });
  await fs.mkdir(`${process.env.FILE_ROOT_PATH}/user1/activity1/files`, { recursive: true });
  await fs.writeFile(`${process.env.FILE_ROOT_PATH}/user1/activity1/certifications/a.svg12345678`, Buffer.from("Y29udGVudGFzdmc=", "base64"))
  await fs.writeFile(`${process.env.FILE_ROOT_PATH}/user1/activity1/endorsements/b.svg12345678`, Buffer.from("Y29udGVudGJzdmc=", "base64"))
  await fs.writeFile(`${process.env.FILE_ROOT_PATH}/user1/activity1/files/c.svg12345678`, Buffer.from("Y29udGVudGNzdmc=", "base64"))
});
AfterStep({ tags: "@filesystem" }, async () => {
  await fs.rm(`${process.env.FILE_ROOT_PATH}/user1`, { recursive: true });
});

Before(async function () {
  const { app, client } = await setupApplication();
  this.app = app;
  this.client = client;
});



After(async function () {
  await this.app.stop();
});
