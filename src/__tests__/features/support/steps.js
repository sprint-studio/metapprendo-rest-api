const { When, Then } = require("@cucumber/cucumber");

When("The MetApprendo Admin user is requested", async function () {
  const res = await this.client.get("/admin").expect(200);
  this.user = res.body;
});

When("The MetApprendo Admin user is created", async function () {
  const res = await this.client.post("/admin").expect(200);
  this.user = res.body;
});

When(
  "an existing user is assigned to be admin of an existing company group {string}",
  async function (group) {
    const res = await this.client.post(`/companies/${group}/admin`).expect(200);
    this.user = res.body;
  }
);

Then("It becomes admin of the company group {string}", async function (group) {
  // TODO to implement
});

Then("I should receive the user with name {string}", function (expectedName) {
  this.user.nomeCompleto.should.equal(expectedName);
});

// Scenarios aboutCreate new company group scenarios
When(
  "The MetApprendo Admin send a request with all mandatory data to create a new Company group",
  async () => {
    // TODO to implement
  }
);

Then(
  "The System create a transaction into the Blockchain and a send a successful response",
  async () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without any data", async () => {
  // TODO to implement
});

Then(
  "The System respond with a error messages telling to pass mandatory data",
  async () => {
    // TODO to implement
  }
);

When(
  "The MetApprendo admin send a request without ragioneSociale",
  async () => {
    // TODO to implement
  }
);

Then(
  "The System respond with a error messages telling that ragioneSociale is mandatory",
  async () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without CUA", async () => {
  // TODO to implement
});

Then(
  "The System respond with a error messages telling that CUA is mandatory",
  async () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without PIVA", async () => {
  // TODO to implement
});

Then(
  "The System respond with a error messages telling that PIVA is mandatory",
  async () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without CF", async () => {
  // TODO to implement
});

Then(
  "The System respond with a error messages telling that CF is mandatory",
  async () => {
    // TODO to implement
  }
);

When(
  "The company group admin send a request passing idAzienda and idUtente",
  async () => {
    // TODO to implement
  }
);

Then(
  "The system add the user associated to idUtente to the provided company group associated to idAzienda creating a Blockchain transaction and returning it",
  async () => {
    // TODO to implement
  }
);

When(
  "The company group admin send a request without passing idAzienda",
  async () => {
    // TODO to implement
  }
);

Then(
  "The system return an error message telling that idAzienda is mandatory",
  async () => {
    // TODO to implement
  }
);

When(
  "The company group admin send a request without passing idUtente",
  async () => {
    // TODO to implement
  }
);

Then(
  "The system return an error message telling that idUtente is mandatory",
  async () => {
    // TODO to implement
  }
);

Then(
  "The system make a Blockchain transaction to record that the user is dissociated from the company group",
  async () => {
    // TODO to implement
  }
);


When("The MetApprendo admin send a request to disable a specific user", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request to create an user", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without idUtente", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without nomeCompleto", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without dataNascita", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without username", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without email", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request to update an user dossier", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request to update an user dossier without idTask", async () => {
  // TODO to implement
});
