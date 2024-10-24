import { Question } from '../models/question.model';

export async function up() {
  await Question.create([
    {
      question: 'What is the capital of Singapore?',
      region: 'SG',
      cycle: 297,
    },
    {
      question: 'What is the capital of Malaysia?',
      region: 'MY',
      cycle: 300,
    },
    {
      question: 'What is the capital of Indonesia?',
      region: 'ID',
      cycle: 295,
    },
    {
      question: 'What is the capital of Singapore?',
      region: 'SG',
      cycle: 280,
    },
    {
      question: 'What is the capital of Malaysia?',
      region: 'MY',
      cycle: 299,
    },
    {
      question: 'What is the capital of Indonesia?',
      region: 'ID',
      cycle: 298,
    },
  ]);
}

export async function down() {
  await Question.deleteMany();
}
