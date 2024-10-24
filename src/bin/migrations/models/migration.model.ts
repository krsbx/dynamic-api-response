import { model } from 'mongoose';
import { migrationSchema } from '../schemas/migration.schema';

export const Migration = model('Migration', migrationSchema, 'migrations');
