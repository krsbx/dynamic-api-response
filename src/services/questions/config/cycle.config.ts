import { env } from '../../../utils/env';
import { TIME_TABLE } from '../utils/cycle.utils';

export const config = {
  get duration() {
    return env.CYCLE_DURATION;
  },
  get unit() {
    return env.CYCLE_UNIT;
  },
  get startDate() {
    return env.CYCLE_START_DATE;
  },
  get durationInMs() {
    return this.duration * TIME_TABLE[this.unit];
  },
};
