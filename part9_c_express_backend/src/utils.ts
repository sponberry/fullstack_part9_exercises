import { 
  NewPatient, 
  PatientFields, 
  EntryFields, 
  DiagnosisFields, 
  Gender, 
  Entry, 
  HealthCheckEntry, 
  HospitalEntry, 
  OccupationalHealthcareEntry, 
  EntryType, 
  HealthCheckRating, 
  BaseEntry,
  ENTRYTYPES, 
  SickLeave,
  Discharge
} from './types';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseData(name),
    dateOfBirth: parseData(dateOfBirth),
    ssn: parseData(ssn),
    gender: parseGender(gender),
    occupation: parseData(occupation),
    entries: [],
  };

  return newEntry;
};

const toNewDiagnosisCode = ( code : DiagnosisFields): string => {
  const diagnosisCode = parseData(code);
  return diagnosisCode;
} ;

const returnFullEntry = (type: EntryType, {...otherFields}: EntryFields, newEntry: BaseEntry) => {
  switch (type) {
    case 'HealthCheck':
      const healthCheckEntry: HealthCheckEntry = {
        healthCheckRating: parseHealthCheckRating(otherFields.healthCheckRating),
        ...newEntry
      };
      return healthCheckEntry;
    case 'Hospital':
      const hospitalEntry: HospitalEntry = {
        discharge: parseDischarge(otherFields.dischargeDate, otherFields.dischargeCriteria),
        ...newEntry
      };
      return hospitalEntry;
    case 'OccupationalHealthcare':
      const healthcareEntry: OccupationalHealthcareEntry = {
        employerName: parseData(otherFields.employerName),
        ...newEntry
      };
      if (otherFields.sickLeaveStart) {
        if (otherFields.sickLeaveEnd) {
          healthcareEntry.sickLeave = parseSickLeave(otherFields.sickLeaveStart, otherFields.sickLeaveEnd);
        } else {
          healthcareEntry.sickLeave = parseSickLeave(otherFields.sickLeaveStart);
        }
      }
      return healthcareEntry;
    default:
      return assertNever(type);
  }
};

export const toNewMedicalEntry = ({ description, date, specialist, type, ...otherFields }: EntryFields): Entry => {
  const randomId = uuid(); //something like: "ec0c22fa-f909-48da-92cb-db17ecdb91c5"

  const newEntry: BaseEntry = {
    id: parseData(randomId),
    description: parseData(description),
    date: parseData(date),
    specialist: parseData(specialist),
    type: parseType(type),
  };
  if (otherFields.diagnosisCodes) {
    newEntry.diagnosisCodes = otherFields.diagnosisCodes.map(toNewDiagnosisCode);
  }

  const entry = returnFullEntry(newEntry.type, otherFields, newEntry);
  return entry;
};

export const parseData = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Text is missing or is not of type "string": ' + text);
  }

  return text;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// this function is a type guard 
// returns a boolean and has type predicate as return type
const isString = (text:unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown) : Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error ('Invalid or missing gender data: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseType = (type: unknown) : EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error ('Invalid or missing type data: ' + type);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return ENTRYTYPES.includes(param as EntryType);
};

const parseHealthCheckRating = (rating: unknown) : HealthCheckRating => {
  console.log('healthcheck values: ', Object.values(HealthCheckRating));
  console.log(rating);
  if (rating == undefined || !isHealthCheckRating(rating)) {
    throw new Error ('Invalid or missing rating data: ' + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(Number(param));
};

const parseDischarge = (date: unknown, criteria: unknown) : Discharge => {
  if (!date || !parseData(date)) {
    throw new Error ('Invalid or missing discharge data for date: ' + date);
  }
  if (!criteria || !parseData(criteria)) {
    throw new Error ('Invalid or missing discharge data for criteria: ' + criteria);
  }
  return {
    date: parseData(date),
    criteria: parseData(criteria),
  };
};

const parseSickLeave = (startDate: unknown, endDate?: unknown) : SickLeave => {
  if (!startDate || !parseData(startDate)) {
    throw new Error ('Invalid or missing sick leave data for start date: ' + startDate);
  }
  const sickLeave: SickLeave = {
    startDate: parseData(startDate)
  };

  if (endDate) {
    sickLeave.endDate = parseData(endDate);
  }

  return sickLeave;
};


//export default { toNewPatient, toNewMedicalEntry };