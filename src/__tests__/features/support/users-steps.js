const { When, Then } = require("@cucumber/cucumber");
const { UserDossierUpdate, DossierActivityUpdate, DossierDocumentUpdate, ActivityFileNoShasum, BlockchainTransaction, UserDossier, User, DossierActivity, DossierDocument, ActivityFile } = require("../../../models");
const fs = require('node:fs/promises');
const { difference } = require('lodash/fp');

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

const performUpdateDossierRequest = async (user, requestBody, client) => {

  const typeOfDossierFiles = ["certifications", "endorsements", "files"];

  const rootPaths = Object.fromEntries(typeOfDossierFiles.map(type =>
    [type, `${process.env.FILE_ROOT_PATH}/${user}/${requestBody.activity.id}/${type}`]
  ));

  const getActivityFilesInFilesystem = async () => {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(rootPaths).map(async ([key, path]) => [key, await fs.readdir(path)])
      )
    );
  }

  const filesBefore = await getActivityFilesInFilesystem();

  const res = await client
    .post(`/users/${user}/dossier`)
    .send(requestBody)
    .expect(200);

  const filesAfter = await getActivityFilesInFilesystem();

  const newlyCreatedCertificationFilename = difference(filesAfter.certifications)(filesBefore.certifications)
  const newlyCreatedEndorsementFilename = difference(filesAfter.endorsements)(filesBefore.endorsements)
  const newlyCreatedFileFilename = difference(filesAfter.files)(filesBefore.files)

  return {
    res,
    rootPaths,
    filesAfter,
    newlyCreatedCertificationFilename,
    newlyCreatedEndorsementFilename,
    newlyCreatedFileFilename,
  }

}
When(
  "The MetApprendo admin sends a request to update dossier for {string} specifying file names that already exist",
  async function (user) {
    this.requestBody = dossierUpdateRequest.toJSON();

    // Pre-existing filenames as specified in setup.js
    this.requestBody.document.certification.fileName = "a.svg";
    this.requestBody.document.endorsement.fileName = "b.svg";
    this.requestBody.document.file.fileName = "c.svg";

    const {
      res,
      newlyCreatedCertificationFilename,
      newlyCreatedEndorsementFilename,
      newlyCreatedFileFilename,
      rootPaths,
    } = await performUpdateDossierRequest(user, this.requestBody, this.client)

    this.certificationBuf = await fs.readFile(`${rootPaths.certifications}/${newlyCreatedCertificationFilename[0]}`);
    this.endorsementBuf = await fs.readFile(`${rootPaths.endorsements}/${newlyCreatedEndorsementFilename[0]}`);
    this.fileBuf = await fs.readFile(`${rootPaths.files}/${newlyCreatedFileFilename[0]}`);

    this.response = res.body;
  }
);

When(
  "The MetApprendo admin sends a request to update dossier for {string}",
  async function (user) {
    this.requestBody = dossierUpdateRequest.toJSON();

    const {
      res,
      newlyCreatedCertificationFilename,
      newlyCreatedEndorsementFilename,
      newlyCreatedFileFilename,
      rootPaths,
    } = await performUpdateDossierRequest(user, this.requestBody, this.client)

    this.certificationBuf = await fs.readFile(`${rootPaths.certifications}/${newlyCreatedCertificationFilename[0]}`);
    this.endorsementBuf = await fs.readFile(`${rootPaths.endorsements}/${newlyCreatedEndorsementFilename[0]}`);
    this.fileBuf = await fs.readFile(`${rootPaths.files}/${newlyCreatedFileFilename[0]}`);

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
Then("The new files of the dossier for user {string} get saved in the local filesystem", async function (user) {
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
      .post("/users/anyuser/dossier")
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
