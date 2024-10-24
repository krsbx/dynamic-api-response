import { env } from '../../../utils/env';
import { TIME_TABLE } from '../utils/cycle.utils';

export const config = {
  duration: env.CYCLE_DURATION,
  unit: env.CYCLE_UNIT,
  startDate: env.CYCLE_START_DATE,
  get durationInMs() {
    return this.duration * TIME_TABLE[this.unit];
  },
};
