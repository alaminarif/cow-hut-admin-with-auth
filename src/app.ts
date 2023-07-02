import express, { Application, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import router from './app/router';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/GlobalErrorHandler';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('App is Running');
});

app.use(globalErrorHandler);
export default app;
