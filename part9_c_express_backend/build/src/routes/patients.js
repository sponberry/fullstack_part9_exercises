"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var patientService_1 = __importDefault(require("../services/patientService"));
//import { toNewPatient, toNewMedicalEntry } from '../utils';
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', function (req, res) {
    console.log('single user requested');
    var userIdRequested = req.params.id;
    var allPatients = patientService_1.default.getEntries();
    var patientsFound = allPatients.filter(function (patient) {
        var currentPatientId = patient === null || patient === void 0 ? void 0 : patient.id;
        if (currentPatientId === userIdRequested)
            return patient;
    });
    if (patientsFound.length === 1 || patientsFound.length > 1) {
        res.json(patientsFound[0]);
    }
    else
        (res.status(404).json({ error: 'no patient found' }));
});
router.post('/', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    var newPatientEntry = (0, utils_1.toNewPatient)(req.body);
    var newPatient = patientService_1.default.addEntry(newPatientEntry);
    res.json(newPatient);
});
router.post('/:id/entries', function (req, res) {
    // dischargeDate & dischargeCriteria are not nested in objects when passed in
    // same for sickLeaveStart & sickLeaveEnd - pass as another field in the object
    // and data will be transformed into the required Entry format
    var userId = (0, utils_2.parseData)(req.params.id);
    console.log(userId);
    var entryType = req.body.type ? (0, utils_2.parseData)(req.body.type) : null;
    if (!entryType) {
        res.status(500).json({ error: 'entry type missing' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    var newEntry = (0, utils_1.toNewMedicalEntry)(req.body);
    res.json({ newEntry: newEntry, userId: userId });
});
exports.default = router;
