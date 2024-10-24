import { Question } from '../models/question.model';

export async function up() {
  await Question.create([
    {
      question: 'What is the capital of Singapore?',
      region: 'SG',
      cycle: 2024,
    },
    {
      question: 'What is the capital of Malaysia?',
      region: 'MY',
      cycle: 2024,
    },
    {
      question: 'What is the capital of Indonesia?',
      region: 'ID',
      cycle: 2024,
    },
    {
      question: 'What is the capital of Singapore?',
      region: 'SG',
      cycle: 2025,
    },
    {
      question: 'What is the capital of Malaysia?',
      region: 'MY',
      cycle: 2025,
    },
    {
      question: 'What is the capital of Indonesia?',
      region: 'ID',
      cycle: 2025,
    },
  ]);
}

export async function down() {
  await Question.deleteMany();
}
