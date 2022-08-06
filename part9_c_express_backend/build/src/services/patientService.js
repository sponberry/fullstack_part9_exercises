"use strict";
//import patientData from '../../data/patients.json';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
//import toNewPatient from '../utils';
var patientData_1 = __importDefault(require("../../data/patientData"));
//const data: Array<Patient> = patientData;
// const patients: Patient[] = patientData.map(obj => {
//   const patientObject = toNewPatient(obj) as Patient;
//   patientObject.id = obj.id;
//   return patientObject;
// });
var getEntries = function () {
    return patientData_1.default;
};
var getNonSensitiveEntries = function () {
    return patientData_1.default.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation
        });
    });
};
var addEntry = function (object) {
    var id = (0, uuid_1.v1)();
    var newPatientEntry = __assign({ id: id }, object);
    return newPatientEntry;
};
exports.default = {
    getEntries: getEntries,
    getNonSensitiveEntries: getNonSensitiveEntries,
    addEntry: addEntry
};
