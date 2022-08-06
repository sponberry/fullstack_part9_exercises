import express from 'express';
import patientService from '../services/patientService';
//import { toNewPatient, toNewMedicalEntry } from '../utils';
import { toNewPatient, toNewMedicalEntry } from '../utils';
//import { returnTypedEntryOrNull } from '../utils';
import { Patient } from '../types';
import { parseData } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  console.log('single user requested');
  const userIdRequested = req.params.id;
  const allPatients = patientService.getEntries();
  const patientsFound: Patient[] | [] = allPatients.filter((patient) => {
    const currentPatientId = patient?.id;
    if (currentPatientId === userIdRequested) return patient;
  });

  if (patientsFound.length === 1 || patientsFound.length > 1) {
    res.json(patientsFound[0]);
  } else (
    res.status(404).json({error: 'no patient found'})
  );
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatientEntry = toNewPatient(req.body);
  const newPatient = patientService.addEntry(newPatientEntry);
  res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
  // dischargeDate & dischargeCriteria are not nested in objects when passed in
  // same for sickLeaveStart & sickLeaveEnd - pass as another field in the object
  // and data will be transformed into the required Entry format
  const userId = parseData(req.params.id);
  console.log('new entry added for user: ',userId);
  const entryType = req.body.type ? parseData(req.body.type) : null;

  if (!entryType) {
    res.status(500).json({error: 'entry type missing'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newEntry = toNewMedicalEntry(req.body);

  res.json(newEntry);
});

export default router;