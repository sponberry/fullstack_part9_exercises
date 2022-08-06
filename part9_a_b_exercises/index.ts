/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import cors from 'cors';
import {calculateBmi} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send("Hello Fullstack!");
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(500).json({error: 'missing parameters'});
  }

  const userHeight = Number(req.query.height);
  const userWeight = Number(req.query.weight);
  
  if (userHeight == userHeight && userWeight == userWeight) {
    const bmiResult = calculateBmi(userHeight, userWeight);
    res.json({
      'height': userHeight,
      'weight': userWeight,
      'bmi': bmiResult
    });
  } else {
    res.status(500).json({error: 'malformatted parameters'});
  }

});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const inputArray: any = req.body.daily_exercises; 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const inputTarget: any = req.body.target; 
  if (!inputArray || !inputTarget || inputArray.length < 1) {
    res.json({ error: 'missing parameters' });
    return;
  }

  let parametersMalformatted = false;
  const target = Number(inputTarget);
  if (target !== target) parametersMalformatted = true;

  const exerciseValues: Array<number> = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  inputArray.forEach((value: any) => {
    const exerciseValue = Number(value);
    if (exerciseValue !== exerciseValue) parametersMalformatted = true;
    exerciseValues.push(exerciseValue);
  });

  if (parametersMalformatted) {
    res.json({ error: 'malformatted parameters'});
    return;
  }

  const response = calculateExercises(exerciseValues, target);
   res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('server running on PORT', PORT);
});