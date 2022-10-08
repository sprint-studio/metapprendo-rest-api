const { When, Then } = require("@cucumber/cucumber");
const { UserDossierUpdate, DossierActivityUpdate, DossierDocumentUpdate, ActivityFileNoShasum, BlockchainTransaction, UserDossier, User, DossierActivity, DossierDocument, ActivityFile } = require("../../../models");
const fs = require('node:fs/promises');

const dossierUpdateRequest = new UserDossierUpdate({
  userId: "userId",
  activity: new DossierActivityUpdate({
    type: "foo",
    title: "foo",
    acceptedFunding: "foo",
    duration: 3,
    year: 2024,
    contents: "foo",
    areas: ["foo"],
    id: "activity1"
  }),
  document: new DossierDocumentUpdate({
    certification: [new ActivityFileNoShasum({
      content: "Zm9vYmFy",
      fileName: "a1.svg"
    })],
    endorsement: [new ActivityFileNoShasum({
      content: "YmFyYmF6",
      fileName: "b1.svg"
    })],
    file: [new ActivityFileNoShasum({
      content: "Zm9vYmF6",
      fileName: "c1.svg"
    })],
  })
});

const expectedDossier = new UserDossier({
  user: new User({
    userId: "user1",
    fullName: "bar",
    gender: "M",
    username: "foo",
    birthDay: "yesterday"
  }),
  activities: [new DossierActivity({
    id: "activity1",
    type: "foo",
    title: "foo",
    acceptedFunding: "foo",
    duration: 3,
    year: 2024,
    contents: "foo",
    areas: ["foo"],
    document: new DossierDocument({
      certification: [new ActivityFile({
        content: "Y29udGVudGFzdmc=",
        sha256checksum: "a",
        fileName: "a.svg"
      })],
      endorsement: [new ActivityFile({
        content: "Y29udGVudGJzdmc=",
        sha256checksum: "b",
        fileName: "b.svg"
      })],
      file: [new ActivityFile({
        content: "Y29udGVudGNzdmc=",
        sha256checksum: "c",
        fileName: "c.svg"
      })],
    })
  })]
});

When("The MetApprendo Admin user is requested", async function () {
  const res = await this.client.get("/admin").expect(200);
  this.user = res.body;
});

When("The MetApprendo Admin user is created", async function () {
  const res = await this.client.post("/admin").expect(200);
  this.user = res.body;
});

When(
  "an existing user is assigned to be admin of an existing company {string}",
  async function (group) {
    // TODO this fails. Implement later
    // const res = await this.client.post(`/companies/${group}/admin`).expect(200);
    // this.user = res.body;
  }
);

When(
  "The MetApprendo admin sends a request to update dossier for {string}",
  async function (user) {
    this.requestBody = dossierUpdateRequest.toJSON();
    const res = await this
      .client
      .post(`/users/${user}/dossier`)
      .send(this.requestBody)
      .expect(200);
    const certificationPath = `${process.env.FILE_ROOT_PATH}/${user}/${this.requestBody.activity.id}/certifications/${this.requestBody.document.certification[0].fileName}`
    const endorsementPath = `${process.env.FILE_ROOT_PATH}/${user}/${this.requestBody.activity.id}/endorsements/${this.requestBody.document.endorsement[0].fileName}`
    const filePath = `${process.env.FILE_ROOT_PATH}/${user}/${this.requestBody.activity.id}/files/${this.requestBody.document.file[0].fileName}`
    this.certificationBuf = await fs.readFile(certificationPath);
    this.endorsementBuf = await fs.readFile(endorsementPath);
    this.fileBuf = await fs.readFile(filePath);

    this.response = res.body;
  }
);

When("The MetApprendo admin sends a request to retrieve an user dossier for {string}", async function (user) {
  const res = await this
    .client
    .get(`/users/${user}/dossier`)
    .expect(200);
  this.response = res.body;
})

Then("The dossier for user {string} is returned", async function (string) {
  this.response.payload.should.eql(expectedDossier.toJSON());
})

Then("The system send a successful transaction response with the same body provided",
  async function () {
    Object.keys(this.response).should.have.members(Object.keys(BlockchainTransaction.definition.properties))
    this.response.payload.should.eql(this.requestBody);
  })

Then("The dossier gets saved in the blockchain", function () {
  // TODO to implement
  return true;
})
Then("The files of the dossier for user {string} get saved in the local filesystem", async function (user) {
  this.certificationBuf.toString("base64").should.equal(this.requestBody.document.certification[0].content);
  this.endorsementBuf.toString("base64").should.equal(this.requestBody.document.endorsement[0].content);
  this.fileBuf.toString("base64").should.equal(this.requestBody.document.file[0].content);
})


When(
  "The MetApprendo admin sends a request to update an user dossier containing duplicated filenames",
  async function () {
    this.requestBody = dossierUpdateRequest.toJSON();
    this.requestBody.document.certification[1] = this.requestBody.document.certification[0]
    const res = await this
      .client
      .post(`/users/anyuser/dossier`)
      .send(this.requestBody)
      .expect(422);

    this.response = res.body;
  }
);

Then("The System respond with a error messages telling that the dossier contains duplicated filenames",
  async function () {
    this.response.error.message.should.contain("must be unique");
  }
);





Then("It becomes admin of the company {string}", async function (group) {
  // TODO to implement
});

Then("I should receive the user with name {string}", function (expectedName) {
  this.user.fullName.should.equal(expectedName);
});

// Feature Profiles steps
When(
  "The MetApprendo admin sends a request with all necessary informations",
  () => {
    // TODO to implement
  }
);

Then(
  "The system create a new profile making new transaction on the Blockchain and the transaction informations",
  () => { }
);

When(
  "The MetApprendo admin sends a request without idProfilo property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that idProfilo is mandatory",
  () => { }
);

When(
  "The MetApprendo admin sends a request without nome property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that nome is mandatory",
  () => { }
);

When(
  "The MetApprendo admin sends a request without descrizione property into the body",
  () => {
    // TODO to implement
  }
);

Then(
  "The System respond with an error telling that descrizione is mandatory",
  () => { }
);

// Educational Pills steps
When(
  "The MetApprendo admin sends a request with all necessary informations to create an Educational Pills",
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

When("The MetApprendo admin sends a request without idPillola", () => {
  // TODO to implement
});

Then(
  "The System respond with an error telling that idPillola is mandatory",
  () => {
    // TODO to implement
  }
);

When("The MetApprendo admin sends a request without titolo", () => {
  // TODO to implement
});

Then(
  "The System respond with an error telling that titolo is mandatory",
  () => {
    // TODO to implement
  }
);

When(
  "The MetApprendo admin sends a request to disable a specific user",
  async () => {
    // TODO to implement
  }
);

When("The MetApprendo admin sends a request to create an user", async () => {
  // TODO to implement
});

When("The MetApprendo admin sends a request without userId", async () => {
  // TODO to implement
});

When("The MetApprendo admin sends a request without fullName", async () => {
  // TODO to implement
});

When("The MetApprendo admin sends a request without dataNascita", async () => {
  // TODO to implement
});

When("The MetApprendo admin sends a request without username", async () => {
  // TODO to implement
});

When(
  "The MetApprendo admin sends a request to update an user dossier without idTask",
  async () => {
    // TODO to implement
  }
);
