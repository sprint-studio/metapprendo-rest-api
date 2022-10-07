import {injectable} from '@loopback/core';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {ActivityFile, DossierActivity, DossierDocument, DossierDocumentUpdate} from '../models';

@injectable()
export class ActivityDocumentRepository {
  private fileRootPath: string;

  constructor() {
    if(!process.env.FILE_ROOT_PATH) {
      throw new Error("Please specify FILE_ROOT_PATH env variable")
    }
    this.fileRootPath = process.env.FILE_ROOT_PATH;
  }

  private getPathFromUserAndActivity(userId: string,
    activityId: string): string {
      return `${this.fileRootPath}/${userId}/${activityId}`;
    }

  async saveActivityDocument(
    userId: string,
    activityId: string,
    dossierDocument: DossierDocumentUpdate
  ): Promise<boolean> {
    const finalPath = this.getPathFromUserAndActivity(userId, activityId);
    await mkdir(finalPath, { recursive: true });
    await mkdir(`${finalPath}/certifications`);
    await mkdir(`${finalPath}/endorsements`);
    await mkdir(`${finalPath}/files`);

    await Promise.all(dossierDocument.certification.map(async fileObj =>
      writeFile(`${finalPath}/certifications/c1`, Buffer.from(fileObj.content, 'base64'))));

    await Promise.all(dossierDocument.endorsement.map(async fileObj =>
      writeFile(`${finalPath}/endorsements/e1`, Buffer.from(fileObj.content, 'base64'))));

    await Promise.all(dossierDocument.file.map(async fileObj =>
      writeFile(`${finalPath}/files/f1`, Buffer.from(fileObj.content, 'base64'))));
    return true;
  }

  async attachFileContentsToActivity(
    userId: string,
    activity: DossierActivity
  ): Promise<DossierActivity> {
    const {id: activityId, document} = activity;
    const finalPath = this.getPathFromUserAndActivity(userId, activityId);

    const putContentInDossierFile = (path: string) => async (dossierFile: ActivityFile) => ({
      ...dossierFile,
      content: await readFile(`${path}/${dossierFile.fileName}`, {encoding: 'base64'})
    })

    const newCertifications = (await Promise.all(document.certification.map(putContentInDossierFile(`${finalPath}/certifications`))))
      .map(f => new ActivityFile(f));
    const newEndorsements = (await Promise.all(document.endorsement.map(putContentInDossierFile(`${finalPath}/endorments`))))
      .map(f => new ActivityFile(f));
    const newFiles =( await Promise.all(document.file.map(putContentInDossierFile(`${finalPath}/files`))))
      .map(f => new ActivityFile(f));

    const documentWithFileContents = new DossierDocument({
      certification: newCertifications,
      endorsement: newEndorsements,
      file: newFiles
    });

    return new DossierActivity({
      ...activity,
      document: documentWithFileContents
    })
  }
}
