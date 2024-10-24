import { Schema } from 'mongoose';
import type { IQuestion } from '../interfaces/question.interface';

export const questionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  region: { type: String, required: true },
  cycle: { type: Number, required: true },
});
