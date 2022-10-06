/* eslint-disable @typescript-eslint/no-invalid-this */
const { After, Before } = require('@cucumber/cucumber');
const { setupApplication } = require('../../test-helper');
require('chai').should()

Before(async function () {
  const { app, client } = await setupApplication();

  this.app = app;
  this.client = client;
});

After(async function () {
  await this.app.stop();
});
