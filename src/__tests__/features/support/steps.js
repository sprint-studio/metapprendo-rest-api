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
  this.user.fullName.should.equal(expectedName);
});

// Feature Profiles steps
When(
  "The MetApprendo Admin send a request with all necessary informations",
  () => {
    // TODO to implement
  }
);

Then(
  "The system create a new profile making new transaction on the Blockchain and the transaction informations",
  () => {}
);

When(
  "The MetApprendo Admin send a request without idProfilo property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that idProfilo is mandatory",
  () => {}
);

When(
  "The MetApprendo Admin send a request without nome property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that nome is mandatory",
  () => {}
);

When(
  "The MetApprendo Admin send a request without descrizione property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that descrizione is mandatory",
  () => {}
);

// Educational Pills steps
When(
  "The MetApprendo admin send a request with all necessary informations to create an Educational Pills",
  () => {
    // TODO to implement
  }
);

Then(
  "The system create a new Educational Pills making new transaction on the Blockchain and return the informations",
  () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without idPillola", () => {
  // TODO to implement
});

Then(
  "The System respond with an error telling that idPillola is mandatory",
  () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without titolo", () => {
  // TODO to implement
});

Then(
  "The System respond with an error telling that titolo is mandatory",
  () => {
    // TODO to implement
  }
);

When(
  "The MetApprendo admin send a request to disable a specific user",
  async () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request to create an user", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without userId", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without fullName", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without dataNascita", async () => {
  // TODO to implement
});

When("The MetApprendo admin send a request without username", async () => {
  // TODO to implement
});

When(
  "The MetApprendo admin send a request to update an user dossier",
  async () => {
    // TODO to implement
  }
);

When(
  "The MetApprendo admin send a request to update an user dossier without idTask",
  async () => {
    // TODO to implement
  }
);
