import express, { Application, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import globalErrodHandler from './app/middleware/GlobalErrorHandler';
import router from './app/router';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('App is Running');
});

app.use(globalErrodHandler);
export default app;
