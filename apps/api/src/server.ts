import express from 'express';
import cors from 'cors';
import { config } from './config/env.config.js';
import studentRouter from './modules/students/student.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', studentRouter);

app.listen(config.port, () => {
  console.log(`Coffedu API is listening on port ${config.port}`);
  //console.log("PORT:", process.env.PORT);
});
