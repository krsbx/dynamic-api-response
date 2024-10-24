import type { NextFunction, Request, Response } from 'express';
import { getRegionByIp } from '../utils/question.utils';
import { getCurrentCycle } from '../utils/cycle.utils';
import { Question } from '../models/question.model';
import { redis } from '../../../utils/redis';
import { config } from '../config/cycle.config';

export async function getQuestionRegion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.ip || req.socket.remoteAddress || '';
  const region = await getRegionByIp(ip);

  res.locals.region = region;

  return next();
}

export async function getQuestionByRegionCycle(_req: Request, res: Response) {
  try {
    const region = res.locals.region;
    const cycle = getCurrentCycle();

    const cached = await redis.get(`question:${region}`);

    if (cached) {
      res.json({ question: JSON.parse(cached) });
      return;
    }

    const question = await Question.findOne({
      region,
      cycle,
    });

    if (question) {
      await redis.set(
        `question:${region}`,
        JSON.stringify(question),
        'EX',
        config.durationInMs
      );

      res.json({ question });
      return;
    }

    res.status(404).json({ error: 'Question not found for this region' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch question' });
  }
}
