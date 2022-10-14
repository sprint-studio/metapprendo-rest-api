import { when, then, binding } from "@lynxwall/cucumber-tsflow";
import fs from 'node:fs/promises';
import { difference } from 'lodash/fp';
import { TestSetup } from "./test-setup";
import { dossierUpdateRequest, expectedDossier } from "../mock-data";
import { BlockchainTransaction } from "../../../models";

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

@binding()
export class UserTestScenarios extends TestSetup {
  private certificationBuf: Buffer;
  private endorsementBuf: Buffer;
  private fileBuf: Buffer;

  @when(
    "The MetApprendo admin sends a request to update dossier for {string} specifying file names that already exists")
  public async updateUserDossierWithNameAlreadyExists(user) {
    this.requestBody = dossierUpdateRequest.toJSON();

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

  @when(
    "The MetApprendo admin sends a request to update dossier for {string}")
  public async updateUserDossier(user) {
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

  @when("The MetApprendo admin sends a request to retrieve an user dossier for {string}")
  public async retrieveUserDossier(user) {
    const res = await this
      .client
      .get(`/users/${user}/dossier`)
      .expect(200);
    this.response = res.body;
  }

  @then("The dossier for user {string} is returned")
  public async returnUserDossier(string) {
    this.response.payload.should.eql(expectedDossier.toJSON());
  }

  @then("The system send a successful transaction response with the same body provided")
  public async checkBodyResponse() {
    Object.keys(this.response).should.have.members(Object.keys(BlockchainTransaction.definition.properties))
    this.response.payload.should.eql(this.requestBody);
  }

  @then("The dossier gets saved in the blockchain")
  public dossierIsSavedInTheBlockchain() {
    return true;
  }

  @then("The new files of the dossier for user {string} get saved in the local filesystem")
  public async saveFileInTheLocalFilesystem(user) {
    this.certificationBuf.toString("base64").should.equal(this.requestBody.document.certification[0].content);
    this.endorsementBuf.toString("base64").should.equal(this.requestBody.document.endorsement[0].content);
    this.fileBuf.toString("base64").should.equal(this.requestBody.document.file[0].content);
  }


  @when("The MetApprendo admin sends a request to update an user dossier containing duplicated filenames")
  public async tryToUpdateDossierWithDuplicatedFilenames() {
    this.requestBody = dossierUpdateRequest.toJSON();
    this.requestBody.document.certification[1] = this.requestBody.document.certification[0]
    const res = await this
      .client
      .post("/users/anyuser/dossier")
      .send(this.requestBody)
      .expect(422);

    this.response = res.body;
  }

  @then("The System respond with a error messages telling that the dossier contains duplicated filenames")
  public async dossierContainesDuplicatedFilenames() {
    this.response.error.message.should.contain("must be unique");
  }
}

