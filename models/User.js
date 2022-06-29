import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      // validator.isEmail is a function which will be invoked and will automatically get access to whatever is passed in the email when we setting up a user
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'last name',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },
});

// Mongoose Middleware (hook)
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// you can log this right after user is created User.create({}) (i.e authController.js)
// We create a custom mongoose method to be able to access values for a specific user and use with JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, 'temporarySecret', { expiresIn: '1d' });
};

export default mongoose.model('User', UserSchema);
