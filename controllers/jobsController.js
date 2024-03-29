import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }
  /// req.user.userId comes from auth.js middleware
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  // check permissions

  /// alternative job update approach:
  /// alternative because Job.findOneAndUpdate does not trigger a hook (for now there is no hooks in the Job model.)
  // job.position = position;
  // job.company = company;
  // job.jobLocation = jobLocation;

  // need to destructure jobLocation from req.body
  // const { company, position, jobLocation } = req.body;

  // await job.save();
  // res.status(StatusCodes.OK).json({ job });

  /// preferred approach for job update because there is no hooks in Job model:
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  res.send('show stats');
};

export { getAllJobs, createJob, deleteJob, updateJob, showStats };
