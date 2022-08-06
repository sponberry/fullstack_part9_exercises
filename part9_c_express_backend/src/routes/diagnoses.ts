import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

router.post('/', (req, res) => {
  console.log('request received:', req);
  res.send('Diagnoses logged!');
});

export default router;