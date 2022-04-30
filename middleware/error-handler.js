import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);

  const defaultError = {
    // err.statusCode could come from CustomAPIError set up in authController. It throws 400 if name, email or password is missing.
    StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    // utilize custom errors set up in authController by throwing new Error.
    msg: err.message || 'Something went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    defaultError.StatusCode = StatusCodes.BAD_REQUEST;
    // could use quick option for multiple errors:
    // defaultError.msg = err.message;

    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }

  if (err.code && err.code === 11000) {
    defaultError.StatusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  // res.status(defaultError.StatusCode).json({ msg: err });
  res.status(defaultError.StatusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
