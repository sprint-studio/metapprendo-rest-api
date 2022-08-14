const { When, Then } = require('@cucumber/cucumber')

When('the MetApprendo Admin user is requested', async function () {
  const res = await this.client.get('/admin').auth('test', 'test').expect(200);
  this.user = res.body;
});

Then('I should receive the user with name {string}', function (expectedName) {
  this.user.nomeCompleto.should.equal(expectedName);
});
