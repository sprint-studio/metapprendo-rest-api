const { When, Then } = require('@cucumber/cucumber')

When('The MetApprendo Admin user is requested', async function () {
  const res = await this.client.get('/admin').expect(200);
  this.user = res.body;
});

When('The MetApprendo Admin user is created', async function () {
  const res = await this.client.post('/admin').expect(200);
  this.user = res.body;
});

When('an existing user is assigned to be admin of an existing company group {string}', async function (group) {
  const res = await this.client.post(`/companies/${group}/admin`).expect(200);
  this.user = res.body;
});

Then('It becomes admin of the company group {string}', async function (group) {
  // TODO to implement
});

Then('I should receive the user with name {string}', function (expectedName) {
  this.user.nomeCompleto.should.equal(expectedName);
});
