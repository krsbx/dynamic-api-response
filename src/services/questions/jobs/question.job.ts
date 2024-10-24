import cron from 'node-cron';
import { redis } from '../../../utils/redis';
import { config } from '../config/cycle.config';
import { Question } from '../models/question.model';
import { getCurrentCycle } from '../utils/cycle.utils';
import { QUESTION_REGIONS } from '../utils/question.utils';

async function preloadQuestion() {
  const cycle = getCurrentCycle();

  for (const region of QUESTION_REGIONS) {
    const question = await Question.findOne({
      region,
      cycle,
    });

    // Store the question in Redis
    if (question) {
      await redis.set(
        `question:${region}`,
        JSON.stringify(question),
        'EX',
        config.durationInMs
      );
    }
  }
}

cron.schedule('0 19 * * 1', () => {
  preloadQuestion()
    .then(() => {
      console.log('Questions preloaded for new cycle!');
    })
    .catch(() => {
      console.log('Failed to preload questions for new cycle!');
    });
});
