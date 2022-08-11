// This basic auth middleware is temporary until we set up the service
// in Kubernetes with mutual HTTPS verification and IP Whitelisting
import {Middleware} from '@loopback/rest';
import auth from 'basic-auth';

const authMiddleware: Middleware = async (middlewareCtx, next) => {
    const {request} = middlewareCtx;

    const credentials = auth(request)
    
    if(!credentials) {
      return middlewareCtx.response.status(401).send()
    }

    const credentialsAreCorrect = credentials.name === process.env.BASIC_AUTH_USERNAME 
      && credentials.pass === process.env.BASIC_AUTH_PASSWORD

    if(!credentialsAreCorrect) {
      return middlewareCtx.response.status(401).send()
    }

    // Proceed with next middleware
    return next();

  };
  
  export default authMiddleware;