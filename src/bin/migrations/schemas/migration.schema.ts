import { Schema } from 'mongoose';
import { IMigration } from '../interfaces/migration.itnerface';

export const migrationSchema = new Schema<IMigration>(
  {
    migrationName: { type: String, required: true },
    executedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);
