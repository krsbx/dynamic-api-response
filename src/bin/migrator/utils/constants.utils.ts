export const MIGRATION_ACTION = {
  UP: 'up',
  DOWN: 'down',
  REVERT: 'revert',
  LATEST: 'latest',
} as const;

export type MigrationAction =
  (typeof MIGRATION_ACTION)[keyof typeof MIGRATION_ACTION];
