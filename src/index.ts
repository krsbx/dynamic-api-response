import express from 'express';
import { env } from './utils/env';
import { questionRouter } from './services/questions/router/question.router';
import { connectDB } from './utils/mongoose';

connectDB();

const app = express();

app.use('/questions', questionRouter);

app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT}`);
});
