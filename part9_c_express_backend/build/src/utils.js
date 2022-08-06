"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = exports.parseData = exports.toNewMedicalEntry = exports.toNewPatient = void 0;
var types_1 = require("./types");
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var toNewPatient = function (_a) {
    var name = _a.name, dateOfBirth = _a.dateOfBirth, ssn = _a.ssn, gender = _a.gender, occupation = _a.occupation;
    var newEntry = {
        name: (0, exports.parseData)(name),
        dateOfBirth: (0, exports.parseData)(dateOfBirth),
        ssn: (0, exports.parseData)(ssn),
        gender: parseGender(gender),
        occupation: (0, exports.parseData)(occupation),
        entries: [],
    };
    return newEntry;
};
exports.toNewPatient = toNewPatient;
var toNewDiagnosisCode = function (code) {
    var diagnosisCode = (0, exports.parseData)(code);
    return diagnosisCode;
};
var returnFullEntry = function (type, _a, newEntry) {
    var otherFields = __rest(_a, []);
    switch (type) {
        case 'HealthCheck':
            var healthCheckEntry = __assign({ healthCheckRating: parseHealthCheckRating(otherFields.healthCheckRating) }, newEntry);
            return healthCheckEntry;
        case 'Hospital':
            var hospitalEntry = __assign({ discharge: parseDischarge(otherFields.dischargeDate, otherFields.dischargeCriteria) }, newEntry);
            return hospitalEntry;
        case 'OccupationalHealthcare':
            var healthcareEntry = __assign({ employerName: (0, exports.parseData)(otherFields.employerName) }, newEntry);
            if (otherFields.sickLeaveStart) {
                if (otherFields.sickLeaveEnd) {
                    healthcareEntry.sickLeave = parseSickLeave(otherFields.sickLeaveStart, otherFields.sickLeaveEnd);
                }
                else {
                    healthcareEntry.sickLeave = parseSickLeave(otherFields.sickLeaveStart);
                }
            }
            return healthcareEntry;
        default:
            return (0, exports.assertNever)(type);
    }
};
var toNewMedicalEntry = function (_a) {
    var description = _a.description, date = _a.date, specialist = _a.specialist, type = _a.type, otherFields = __rest(_a, ["description", "date", "specialist", "type"]);
    var randomId = uuid(); //something like: "ec0c22fa-f909-48da-92cb-db17ecdb91c5"
    var newEntry = {
        id: (0, exports.parseData)(randomId),
        description: (0, exports.parseData)(description),
        date: (0, exports.parseData)(date),
        specialist: (0, exports.parseData)(specialist),
        type: parseType(type),
    };
    if (otherFields.diagnosisCodes) {
        newEntry.diagnosisCodes = otherFields.diagnosisCodes.map(toNewDiagnosisCode);
    }
    var entry = returnFullEntry(newEntry.type, otherFields, newEntry);
    return entry;
};
exports.toNewMedicalEntry = toNewMedicalEntry;
var parseData = function (text) {
    if (!text || !isString(text)) {
        throw new Error('Text is missing or is not of type "string": ' + text);
    }
    return text;
};
exports.parseData = parseData;
var assertNever = function (value) {
    throw new Error("Unhandled discriminated union member: ".concat(JSON.stringify(value)));
};
exports.assertNever = assertNever;
// this function is a type guard 
// returns a boolean and has type predicate as return type
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error('Invalid or missing gender data: ' + gender);
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isGender = function (param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
var parseType = function (type) {
    if (!type || !isEntryType(type)) {
        throw new Error('Invalid or missing type data: ' + type);
    }
    return type;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isEntryType = function (param) {
    return types_1.ENTRYTYPES.includes(param);
};
var parseHealthCheckRating = function (rating) {
    console.log('healthcheck values: ', Object.values(types_1.HealthCheckRating));
    console.log(rating);
    if (rating == undefined || !isHealthCheckRating(rating)) {
        throw new Error('Invalid or missing rating data: ' + rating);
    }
    return rating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isHealthCheckRating = function (param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(Number(param));
};
var parseDischarge = function (date, criteria) {
    if (!date || !(0, exports.parseData)(date)) {
        throw new Error('Invalid or missing discharge data for date: ' + date);
    }
    if (!criteria || !(0, exports.parseData)(criteria)) {
        throw new Error('Invalid or missing discharge data for criteria: ' + criteria);
    }
    return {
        date: (0, exports.parseData)(date),
        criteria: (0, exports.parseData)(criteria),
    };
};
var parseSickLeave = function (startDate, endDate) {
    if (!startDate || !(0, exports.parseData)(startDate)) {
        throw new Error('Invalid or missing sick leave data for start date: ' + startDate);
    }
    var sickLeave = {
        startDate: (0, exports.parseData)(startDate)
    };
    if (endDate) {
        sickLeave.endDate = (0, exports.parseData)(endDate);
    }
    return sickLeave;
};
//export default { toNewPatient, toNewMedicalEntry };
