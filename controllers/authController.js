import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

// to make code cleaner I use express-async-errors package, it does try/catch behind scenes
// express-async-errors imported in server.js
// const register = async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json({ user });
//   } catch (error) {
//     // next(error) runs app.use(errorHandlerMiddleware) from server.js and errors comes from User model
//     next(error);
//   }
// };

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // new Error creates object with .message property which we can use as a custom error
    throw new BadRequestError('Please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

const updateUser = async (req, res) => {
  res.send('updateUser');
};

export { register, login, updateUser };
