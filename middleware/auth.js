import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // const headers = req.headers;
  // console.log(headers);
  //// authHeader its authorization bearer jwt token and if missing we throw error
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  next();
};

export default auth;
