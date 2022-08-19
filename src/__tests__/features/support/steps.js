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

When(
  "The MetApprendo Admin send a request without stato property into the body",
  () => {
    // TODO to implement
  }
);

Then("The System respond with an error telling that stato is mandatory", () => {
  // TODO to implement
});

// Company Group steps
When(
  "The MetApprendo admin send a request with all necessary informations to create a Company Group",
  () => {
    // TODO to implement
  }
);

Then(
  "The system create a new Company Group making new transaction on the Blockchain and return the informations",
  () => {
    // TODO to implement
  }
);

When("The MetApprendo admin send a request without idGruppo", () => {
  // TODO to implement
});

Then(
  "The System respond with an error telling that idGruppo is mandatory",
  () => {
    // TODO to implement
  }
);

When(
  "The MetApprendo Admin send a request without nome property into the body",
  () => {
    // TODO to implement
  }
);

Then("The System respond with an error telling that nome is mandatory", () => {
  // TODO to implement
});

When(
  "The MetApprendo Admin send a request without descrizione property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that descrizione is mandatory",
  () => {
    // TODO to implement
  }
);

When(
  "The MetApprendo Admin send a request without stato property into the body",
  () => {
    // TODO to implement
  }
);

Then("The System respond with an error telling that stato is mandatory", () => {
  // TODO to implement
});

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
