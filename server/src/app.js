import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { run } from './bootstrap';
import { errorResponseSender } from './services/responseSender';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send({ serverLive: true }));

run(app);

app.use(errorResponseSender);

export default app;
