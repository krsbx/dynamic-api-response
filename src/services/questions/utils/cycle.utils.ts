import { config } from '../config/cycle.config';

export const TIME_UNIT = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const;

export const TIME_TABLE = {
  get [TIME_UNIT.DAY]() {
    return 1000 * 60 * 60 * 24;
  },
  get [TIME_UNIT.WEEK]() {
    return this[TIME_UNIT.DAY] * 7;
  },
  get [TIME_UNIT.MONTH]() {
    return this[TIME_UNIT.DAY] * 30;
  },
  get [TIME_UNIT.YEAR]() {
    return this[TIME_UNIT.DAY] * 365;
  },
};

export function getCurrentCycle() {
  const { startDate, durationInMs } = config;
  const now = new Date();
  const timeDiff = now.getTime() - startDate.getTime();

  const cycle = Math.floor(timeDiff / durationInMs);

  return cycle;
}
