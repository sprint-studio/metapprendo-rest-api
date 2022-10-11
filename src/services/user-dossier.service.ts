import {injectable} from '@loopback/core';
import {repository} from '@loopback/repository/dist';
import {createHash, randomBytes} from 'crypto';

import {ActivityFile, ActivityFileNoShasum, DossierActivity, DossierDocument, DossierDocumentUpdate, User, UserDossier, UserDossierUpdate} from '../models';
import {ActivityDocumentRepository} from '../repositories';



@injectable()
export class UserDossierService {
  RANDOM_SUFFIX_LENGTH = 8;

  constructor(@repository(ActivityDocumentRepository) private activityDocumentRepository: ActivityDocumentRepository) {
    this.activityDocumentRepository = new ActivityDocumentRepository();
    this.appendRandomSuffix = this.appendRandomSuffix.bind(this);
    this.stripRandomSuffix = this.stripRandomSuffix.bind(this);
  }

  computeFileHash(base64content: string): string {
    const hashSum = createHash('sha256');
    hashSum.update(base64content);
    return hashSum.digest("hex");
  }


  private appendRandomSuffix(file: ActivityFileNoShasum): ActivityFileNoShasum {
    const {fileName, ...rest} = file;
    return new ActivityFileNoShasum({
      ...rest,
      fileName: `${fileName}${randomBytes(this.RANDOM_SUFFIX_LENGTH).toString("hex")}`
    })
  }

  private stripRandomSuffix(fileNameWithSuffix: ActivityFile): ActivityFile {
    const {fileName, ...rest} = fileNameWithSuffix;
    return new ActivityFile({
      ...rest,
      fileName: fileName.slice(0, fileName.length - this.RANDOM_SUFFIX_LENGTH)
    })
  }


  async addActivityToUserDossier(dossier: UserDossierUpdate, userId: string): Promise<void> {
    const newDocumentWithSuffixes = new DossierDocumentUpdate({
      certification: dossier.document
        .certification.map(this.appendRandomSuffix),
      endorsement: dossier.document
        .endorsement.map(this.appendRandomSuffix),
      file: dossier.document
        .file.map(this.appendRandomSuffix),
    });

    const newDossierUpdate = new UserDossierUpdate({
      userId: dossier.userId,
      activity: dossier.activity,
      document: newDocumentWithSuffixes,
    });
    // call chaincode to save activity
    // const certs = dossier.document.certification.map(c => ({...c, sha256hash: this.computeFileHash(c.content)}));
    // console.log('certs...', {certs});
    await this.activityDocumentRepository.saveActivityDocument(userId, newDossierUpdate.activity.id, newDossierUpdate.document)
  }

  private stripSuffixFromAllActivityDocumentFiles(document: DossierDocument): DossierDocument {
    const documentWithoutSuffix = {
      certification: document.certification.map(this.stripRandomSuffix),
      endorsement: document.endorsement.map(this.stripRandomSuffix),
      file: document.file.map(this.stripRandomSuffix),
    }
    return new DossierDocument(documentWithoutSuffix);

  }

  async getUserDossier(userId: string): Promise<UserDossier> {
    // This needs to stay the same as the same dossier in src/__tests__/features/support/steps.js
    // until we implement the blockchain chaincode so we can write the method
    // and the test properly
    const exampleDossierFromChaincode = {
      user: {
        userId: userId,
        fullName: "bar",
        gender: "M",
        username: "foo",
        birthDay: "yesterday"
      },
      activities: [{
        id: "activity1",
        type: "foo",
        title: "foo",
        acceptedFunding: "foo",
        duration: 3,
        year: 2024,
        contents: "foo",
        areas: ["foo"],
        document: {
          certification: [{
            content: "",
            sha256checksum: "a",
            fileName: "a.svg12345678"
          }],
          endorsement: [{
            content: "",
            sha256checksum: "b",
            fileName: "b.svg12345678"
          }],
          file: [{
            content: "",
            sha256checksum: "c",
            fileName: "c.svg12345678"
          }],
        }
      }]
    };

    // Need to create loopback models from plain JS object
    const activitiesInstances = exampleDossierFromChaincode.activities
      .map(a => new DossierActivity({
        ...a,
        document: (() => {

          const certification = a.document.certification.map(f => new ActivityFile(f));
          const endorsement = a.document.endorsement.map(f => new ActivityFile(f));
          const file = a.document.file.map(f => new ActivityFile(f));

          return new DossierDocument({
            ...a.document,
            certification,
            endorsement,
            file
          });
        })(),
      }));

    const activitiesWithContents = await Promise.all(activitiesInstances.map(async activity => {
      return this.activityDocumentRepository.retrieveFileContentsInActivity(userId, activity);
    }));

    const activitiesWitContentsWithohutSuffix = activitiesWithContents.map(
      a => new DossierActivity({...a, document: this.stripSuffixFromAllActivityDocumentFiles(a.document)})
    );


    const dossierInstance = new UserDossier({
      user: new User(exampleDossierFromChaincode.user),
      activities: activitiesWitContentsWithohutSuffix
    })

    return dossierInstance;
  }
}
