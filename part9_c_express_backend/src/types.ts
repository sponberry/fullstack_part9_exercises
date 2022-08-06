export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type PatientFields = {
  name?: unknown;
  dateOfBirth?: unknown;
  ssn?: unknown;
  gender?: unknown;
  occupation?: unknown;
};

export type EntryFields = {
  id?: unknown;
  description?: unknown;
  date?: unknown;
  specialist?: unknown;
  type?: unknown;
  diagnosisCodes?: Array<DiagnosisFields>;
  healthCheckRating?: unknown;
  dischargeDate?: unknown;
  dischargeCriteria?: unknown;
  employerName?: unknown;
  sickLeaveStart?: unknown;
  sickLeaveEnd?: unknown;
};

export type DiagnosisFields = {
  code?: unknown;
  name?: unknown;
  latin?: unknown;
};

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  type: EntryType;
}

// export enum EntryType {
//   HealthCheck = 'HealthCheck',
//   Hospital = 'Hospital',
//   OccupationalHealthcare = 'OccupationalHealthcare',
// }

export const ENTRYTYPES = [ 'HealthCheck', 'Hospital', 'OccupationalHealthcare' ] as const;

export type EntryType = typeof ENTRYTYPES[number];

// export type EntryType =
//   | 'HealthCheck'
//   | 'Hospital'
//   | 'OccupationalHealthcare';

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType;
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;