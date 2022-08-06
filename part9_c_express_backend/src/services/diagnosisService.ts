import diagnosisData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosisData;

const getEntries = ():Diagnose[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};