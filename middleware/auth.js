import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // const headers = req.headers;
  // console.log(headers);
  //// authHeader its authorization bearer jwt token and if missing we throw error
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  /// split header /Bearer 'token'/ to get only the token part
  const token = authHeader.split(' ')[1];
  console.log('token', token);
  try {
    // payload is a { userId: this._id } created by jwt.sign in the User.js schema
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('payload', payload);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
