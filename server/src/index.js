import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { run } from './bootstrap';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send({ serverLive: true }));

run(app);

app.listen(8089);
console.log('server listening on 8089');
