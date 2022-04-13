import express from 'express';
const router = express.Router();

import {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from '../controllers/jobsController.js';

router.route('/').post(createJob).get(getAllJobs);
// /stats needs to be above /:id
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
