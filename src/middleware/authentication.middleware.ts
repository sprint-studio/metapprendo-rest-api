// This basic auth middleware is temporary until we set up the service
// in Kubernetes with mutual HTTPS verification and IP Whitelisting
import {Middleware, MiddlewareContext} from '@loopback/rest';
import auth from 'basic-auth';



const authMiddleware: Middleware = async (middlewareCtx, next) => {
    const {request} = middlewareCtx;

    const sendChallenge = (res: MiddlewareContext["response"]) => {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
      return res.end('Unauthorized')
    }

    const credentials = auth(request)

    if(!credentials) {
      return sendChallenge(middlewareCtx.response)
    }

    const credentialsAreCorrect = credentials.name === process.env.BASIC_AUTH_USERNAME
      && credentials.pass === process.env.BASIC_AUTH_PASSWORD

    if(!credentialsAreCorrect) {
      return sendChallenge(middlewareCtx.response)
    }

    // Proceed with next middleware
    return next();

  };

  export default authMiddleware;
