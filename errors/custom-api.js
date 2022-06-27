class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    // We can create custom error classes by extending the Error class with our own class and custom logic to throw more specific errors. The Error class has the message, name, and stack properties that we inherit from it.
    // Adding statusCode property on the Error instance
    // 400 in this case
  }
}

export default CustomAPIError;
