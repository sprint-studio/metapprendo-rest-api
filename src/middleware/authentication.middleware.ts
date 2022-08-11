// This basic auth middleware is temporary until we set up the service
// in Kubernetes with mutual HTTPS verification and IP Whitelisting
import {Middleware} from '@loopback/rest';
import auth from 'basic-auth';

const authMiddleware: Middleware = async (middlewareCtx, next) => {
    const {request} = middlewareCtx;
    console.log('Request: %s %s', request.method, request);

    const credentials = auth(request)
    if(!credentials) {
      
      throw new Error("Basic Auth credentials not found")
    }

    const credentialsAreCorrect = credentials.name === process.env.BASIC_AUTH_USERNAME 
      && credentials.pass === process.env.BASIC_AUTH_PASSWORD

    if(!credentialsAreCorrect) {
      throw new Error("Invalid Basic Auth credentials") 
    }

    // Proceed with next middleware
    return next();

  };
  
  export default authMiddleware;