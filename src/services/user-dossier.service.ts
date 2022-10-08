import {injectable} from '@loopback/core';
import {repository} from '@loopback/repository/dist';
import {createHash} from 'crypto';

import {ActivityFile, DossierActivity, DossierDocument, User, UserDossier, UserDossierUpdate} from '../models';
import {ActivityDocumentRepository} from '../repositories/activityDocument.repository';



@injectable()
export class UserDossierService {
  constructor(@repository(ActivityDocumentRepository) private activityDocumentRepository: ActivityDocumentRepository) {
    this.activityDocumentRepository = new ActivityDocumentRepository();
  }

  computeFileHash(base64content: string): string {
    const hashSum = createHash('sha256');
    hashSum.update(base64content);
    return hashSum.digest("hex");
  }


  async addActivityToUserDossier(dossier: UserDossierUpdate, userId: string): Promise<void> {
    // call chaincode to save activity
    // const certs = dossier.document.certification.map(c => ({...c, sha256hash: this.computeFileHash(c.content)}));
    // console.log('certs...', {certs});
    await this.activityDocumentRepository.saveActivityDocument(userId, dossier.activity.id, dossier.document)
  }

  async getUserDossier(userId: string): Promise<UserDossier> {
    // This needs to stay the same as the same dossier in src/__tests__/features/support/steps.js
    // until we implement the blockchain chaincode so we can write the method
    // and the test properly
    const dossierFromChaincode = new UserDossier({
      user: new User({
        userId: "user1",
        fullName: "bar",
        gender: "M",
        username: "foo",
        birthDay: "yesterday"
      }),
      activities: [new DossierActivity({
        id:  "activity1",
        type: "foo",
        title: "foo",
        acceptedFunding: "foo",
        duration: 3,
        year: 2024,
        contents: "foo",
        areas: ["foo"],
        document: new DossierDocument({
          certification: [new ActivityFile({
            content: "",
            sha256checksum: "a",
            fileName: "a.svg"
          })],
          endorsement: [new ActivityFile({
            content: "",
            sha256checksum: "b",
            fileName: "b.svg"
          })],
          file: [new ActivityFile({
            content: "",
            sha256checksum: "c",
            fileName: "c.svg"
          })],
        })
      })]
    });

    const dossierWithFileContents = {...dossierFromChaincode,
      activities: await Promise.all(dossierFromChaincode.activities.map(async activity =>
        this.activityDocumentRepository.retrieveFileContentsInActivity(userId, activity)))
      };

    return new UserDossier(dossierWithFileContents);
  }
}
