/* eslint-disable no-unused-expressions */
import filesystem from 'node:fs/promises';
import sinon from 'sinon';
import {ActivityDocumentRepository} from '../';
import {ActivityFile, ActivityFileNoShasum, DossierActivity, DossierActivityUpdate, DossierDocument, DossierDocumentUpdate, User, UserDossier, UserDossierUpdate} from '../../models';

describe('The ActivityDocumentRepository', () => {
  let repo: ActivityDocumentRepository;

  let mkdir: sinon.SinonStub;
  let writeFile: sinon.SinonStub;
  let readFile: sinon.SinonStub;

  const testDossier = new UserDossier({
    user: new User({
      userId: "foo",
      fullName: "bar",
      gender: "M",
      username: "foo",
      birthDay: "yesterday"
    }),
    activities: [new DossierActivity({
      type: "foo",
      id: "activity1",
      title: "foo",
      acceptedFunding: "foo",
      duration: 3,
      year: 2024,
      contents: "foo",
      areas: ["foo"],
      document: new DossierDocument({
        certification: [new ActivityFile({
          content: "Zm9vYmFy",
          sha256checksum: "test1",
          fileName: "a.svg"
        })],
        endorsement: [new ActivityFile({
          content: "YmFyYmF6",
          sha256checksum: "test2",
          fileName: "b.svg"
        })],
        file: [new ActivityFile({
          content: "Zm9vYmF6",
          sha256checksum: "test3",
          fileName: "c.svg"
        })],
      })
    }),
    ]
  });

  const testDossierRequest = new UserDossierUpdate({
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
        content: "foobar",
        fileName: "a.svg"
      })],
      endorsement: [new ActivityFileNoShasum({
        content: "barbaz",
        fileName: "b.svg"
      })],
      file: [new ActivityFileNoShasum({
        content: "foobaz",
        fileName: "c.svg"
      })],
    })
  })

  beforeEach(() => {
    mkdir = sinon.stub(filesystem, "mkdir");
    writeFile = sinon.stub(filesystem, "writeFile");
    readFile = sinon.stub(filesystem, "readFile");
    repo = new ActivityDocumentRepository(mkdir, writeFile, readFile);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('succesfully saves files in base64', async () => {
    await repo.saveActivityDocument("user1", "activity1", testDossierRequest.document);
    mkdir.calledWith("/tmp/user1/activity1/certifications").should.be.true;
    mkdir.calledWith("/tmp/user1/activity1/endorsements").should.be.true;
    mkdir.calledWith("/tmp/user1/activity1/files").should.be.true;
    writeFile.calledWith("/tmp/user1/activity1/certifications/a.svg", Buffer.from("foobar", "base64")).should.be.true;
    writeFile.calledWith("/tmp/user1/activity1/endorsements/b.svg", Buffer.from("barbaz", "base64")).should.be.true;
    writeFile.calledWith("/tmp/user1/activity1/files/c.svg", Buffer.from("foobaz", "base64")).should.be.true;
  });


  it('succesfully retrieve files saved in base64 format', async () => {
    readFile.withArgs("/tmp/user1/activity1/certifications/a.svg").resolves("Zm9vYmFy");
    readFile.withArgs("/tmp/user1/activity1/endorsements/b.svg").resolves("YmFyYmF6");
    readFile.withArgs("/tmp/user1/activity1/files/c.svg").resolves("Zm9vYmF6");
    const dossierResult = await repo.retrieveFileContentsInActivity("user1", testDossier.activities[0]);
    readFile.calledWith("/tmp/user1/activity1/certifications/a.svg", {encoding: 'base64'}).should.be.true;
    readFile.calledWith("/tmp/user1/activity1/endorsements/b.svg", {encoding: 'base64'}).should.be.true;
    readFile.calledWith("/tmp/user1/activity1/files/c.svg", {encoding: 'base64'}).should.be.true;
    dossierResult.should.eql(testDossier.activities[0]);
  });


});
