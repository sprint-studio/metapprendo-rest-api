import {inject} from '@loopback/core';
import {post, Request, requestBody, response, RestBindings} from '@loopback/rest';

export class TrainingPathsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/training_paths')
  @response(200)
  createTrainingPath(@requestBody() trainingPath: {}): {} {
    return {}
  }
}
