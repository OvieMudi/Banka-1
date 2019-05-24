import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';


dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);


router.use('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

app.listen(port, () => {
  console.log(`Sever running on port ${port}`);
});

export default app;
