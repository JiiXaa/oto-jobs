import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

const port = process.env.PORT || 5000;

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// db and authenticate User
import connectDB from './db/connect.js';

// routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

app.use(express.json());
console.log('hello');

app.get('/', (req, res) => {
  res.send('welcome');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // spins server up only if we are connected to the mongo db
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

// connect to the db and starts express
start();
