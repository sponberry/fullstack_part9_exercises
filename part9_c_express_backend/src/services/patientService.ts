//import patientData from '../../data/patients.json';

import { NewPatient, Patient, NonSensitivePatient } from '../types';
import {v1 as uuid} from 'uuid';
//import toNewPatient from '../utils';
import patients from '../../data/patientData';

//const data: Array<Patient> = patientData;

// const patients: Patient[] = patientData.map(obj => {
//   const patientObject = toNewPatient(obj) as Patient;
//   patientObject.id = obj.id;
//   return patientObject;
// });

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = (object: NewPatient): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...object
  };
  
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};