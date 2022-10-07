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


  async addActivityToUserDossier(dossier: UserDossierUpdate, userId: string, activityId = "1"): Promise<void> {
    // call chaincode to save activity
    // const certs = dossier.document.certification.map(c => ({...c, sha256hash: this.computeFileHash(c.content)}));
    // console.log('certs...', {certs});
    await this.activityDocumentRepository.saveActivityDocument(userId, activityId, dossier.document)
  }

  async getUserDossier(userId: string): Promise<UserDossier> {
    // call chaincode to get activity ids
    const user = new User({
      userId: "foo",
      fullName: "bar",
      gender: "M",
      username: "foo",
      birthDay: "yesterday"
    })

    const document = new DossierDocument({
      certification: [new ActivityFile({
        content: "",
        sha256checksum: "",
        fileName: "a.svg"
      })],
      endorsement: [new ActivityFile({
        content: "",
        sha256checksum: "",
        fileName: "a.svg"
      })],
      file: [new ActivityFile({
        content: "",
        sha256checksum: "",
        fileName: "a.svg"
      })],
    })

    const activity = new DossierActivity({
      id:  "1",
      type: "foo",
      title: "foo",
      acceptedFunding: "foo",
      duration: 3,
      year: 2024,
      contents: "foo",
      areas: ["foo"],
      document
    })

    const dossierFromChaincode = new UserDossier({
      user,
      activities: [activity]
    })
    return dossierFromChaincode;
  }
}
