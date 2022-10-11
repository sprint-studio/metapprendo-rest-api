import {
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {isEqual} from 'lodash/fp';
import {ActivityFileNoShasum, DossierDocument, UserDossierUpdate} from '../models';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
type ActivityElementWithDuplicateFilenames = [string, ActivityFileNoShasum[]]
@injectable({tags: {key: ValidateUniqueFilesInterceptor.BINDING_KEY}})
export class ValidateUniqueFilesInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ValidateUniqueFilesInterceptor.name}`;


  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * It checks the area code of the phone number to make sure it matches
   * the provided city name.
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {

    const elementWithDuplicateFilenames = invocationCtx.args
      .filter(a => this.isUserDossierDocument(a))
      .map(a => this.getElementWithDuplicateFilenames(a))
      .find(a => a)

    if (
      elementWithDuplicateFilenames
    ) {
      const error = new HttpErrors.UnprocessableEntity(
        `Provided file names for ${elementWithDuplicateFilenames[0]} must be unique`,
      );
      error.code = "VALIDATION_FAILED";
      error.details = [
        {
          "path": `/document/${elementWithDuplicateFilenames[0]}`,
          "code": "uniqueItemProperties",
          "message": "should pass \"uniqueItemProperties\" keyword validation",
          "info": {
            "duplicatePropert": "fileName"
          }
        }
      ];
      throw error;
    }
    const result = await next();
    return result;
  }

  getElementWithDuplicateFilenames(dossier: UserDossierUpdate): ActivityElementWithDuplicateFilenames | undefined {
    const keyWithDuplicateFilename = Object
      .entries(dossier.document)
      .find((el: [string, ActivityFileNoShasum[]]) => {
        const [, files] = el;
        const filenamesSet = new Set(files.map(f => f.fileName));
        return filenamesSet.size !== files.length;
      })
    return keyWithDuplicateFilename;

  }

  isUserDossierDocument(obj?: {
    document?: DossierDocument
  }): Boolean {

    // assumes that obj is serializable
    const userDossierDocument = obj?.document;
    return !!userDossierDocument &&
      isEqual(Object.keys(userDossierDocument))(Object.keys(DossierDocument.definition.properties));
  }
}
