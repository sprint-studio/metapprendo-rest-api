import {injectable} from '@loopback/core';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {ActivityFile, DossierActivity, DossierDocument, DossierDocumentUpdate} from '../models';

@injectable()
export class ActivityDocumentRepository {
  private fileRootPath: string;

  constructor(private fsMkdir: typeof mkdir = mkdir,
    private fsWriteFile: typeof writeFile = writeFile,
    private fsReadFile: typeof readFile = readFile) {
    if (!process.env.FILE_ROOT_PATH) {
      throw new Error("Please specify FILE_ROOT_PATH env variable")
    }
    this.fileRootPath = process.env.FILE_ROOT_PATH;
  }

  private getPathsFromUserAndActivity(userId: string,
    activityId: string) {
    const finalPath = `${this.fileRootPath}/${userId}/${activityId}`;
    return {
      certificationsPath: `${finalPath}/certifications`,
      endorsementsPath: `${finalPath}/endorsements`,
      filesPath: `${finalPath}/files`
    }

  }


  async saveActivityDocument(
    userId: string,
    activityId: string,
    dossierDocument: DossierDocumentUpdate
  ): Promise<void> {
    const {
      certificationsPath,
      endorsementsPath,
      filesPath
    } = this.getPathsFromUserAndActivity(userId, activityId);

    await this.fsMkdir(certificationsPath, {recursive: true});
    await this.fsMkdir(endorsementsPath, {recursive: true});
    await this.fsMkdir(filesPath, {recursive: true});

    await Promise.all(dossierDocument.certification.map(async fileObj =>
      this.fsWriteFile(`${certificationsPath}/${fileObj.fileName}`, Buffer.from(fileObj.content, 'base64'))));

    await Promise.all(dossierDocument.endorsement.map(async fileObj =>
      this.fsWriteFile(`${endorsementsPath}/${fileObj.fileName}`, Buffer.from(fileObj.content, 'base64'))));

    await Promise.all(dossierDocument.file.map(async fileObj =>
      this.fsWriteFile(`${filesPath}/${fileObj.fileName}`, Buffer.from(fileObj.content, 'base64'))));
  }

  async retrieveFileContentsInActivity(
    userId: string,
    activity: DossierActivity
  ): Promise<DossierActivity> {
    const {id: activityId, document} = activity;
    const {
      certificationsPath,
      endorsementsPath,
      filesPath
    } = this.getPathsFromUserAndActivity(userId, activityId);

    const putContentInDossierFile = (path: string) => async (dossierFile: ActivityFile) => {

      return {
      ...dossierFile,
      content: await this.fsReadFile(`${path}/${dossierFile.fileName}`, {encoding: 'base64'})
    }}

    const newCertifications = (await Promise.all(document.certification.map(putContentInDossierFile(certificationsPath))))
      .map(f => new ActivityFile(f));
    const newEndorsements = (await Promise.all(document.endorsement.map(putContentInDossierFile(endorsementsPath))))
      .map(f => new ActivityFile(f));
    const newFiles = (await Promise.all(document.file.map(putContentInDossierFile(filesPath))))
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
