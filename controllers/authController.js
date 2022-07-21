import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

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
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      // SchemaType.prototype.select() is set for false but it does not work with User.create
      // and that is why we hardcode values for front-end. It is important to omit password and not share it.
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values!');
  }
  // We need to add select method which adds password to the findOne user object. That is because in User model password has select set to false and does not exist in this case as we changed this in user creation phase, because we wanted to hide it at that point. Now we need it for bcrypt to make comparison.
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials!');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials!');
  }
  const token = user.createJWT();

  // this is how we can "hide" password as we don't need it any more and it is not good practice to send sensitive data.
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  console.log('authController update user: ', req.user);
  res.send('updateUser');
};

export { register, login, updateUser };
