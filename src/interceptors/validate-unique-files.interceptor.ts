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
import {ActivityFile, DossierDocument} from '../models';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
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

    if (invocationCtx.args.filter(a => this.isUserDossierDocument(a))
      .map(udd => udd.document)
      .some((dd: DossierDocument) =>
        this.hasDuplicateFilenames(dd.certification) ||
        this.hasDuplicateFilenames(dd.endorsement) ||
        this.hasDuplicateFilenames(dd.file))
    ) {
      throw new HttpErrors.UnprocessableEntity(
        'File names must be unique',
      );
    }
    const result = await next();
    return result;
  }

  hasDuplicateFilenames(files: ActivityFile[]): Boolean {
    const nameSet = new Set(files.map(f => f.fileName));
    console.log('scopare', nameSet, files.length);
    return nameSet.size !== files.length;
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
