import { model } from 'mongoose';
import { questionSchema } from '../schemas/question.schema';

export const Question = model('Question', questionSchema, 'question');
