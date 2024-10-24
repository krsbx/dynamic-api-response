import { Router } from 'express';
import {
  getQuestionRegion,
  getQuestionByRegionCycle,
} from '../middlewares/questions.middleware';

// Start cron jobs
import '../jobs/question.job';

const questionRouter = Router();

questionRouter.get('/', getQuestionRegion, getQuestionByRegionCycle);

export { questionRouter };
