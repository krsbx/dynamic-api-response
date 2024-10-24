import 'dotenv/config';
import { z } from 'zod';
import { TIME_UNIT } from '../services/questions/utils/cycle.utils';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_HOST: z.string(),
  MONGODB_PORT: z.coerce.number().default(27017),
  MONGODB_DATABASE: z.string(),
  MONGODB_USER: z.string(),
  MONGODB_PASSWORD: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string().default('localhost'),

  CYCLE_DURATION: z.coerce.number(),
  CYCLE_UNIT: z.enum([
    TIME_UNIT.DAY,
    TIME_UNIT.WEEK,
    TIME_UNIT.MONTH,
    TIME_UNIT.YEAR,
  ]),
  CYCLE_START_DATE: z.coerce
    .date()
    // Set the start to Jan 1, 2024 at 7pm SGT
    .default(new Date('2024-01-01T19:00:00+08:00')),
});

export const env = envSchema.parse(process.env);
