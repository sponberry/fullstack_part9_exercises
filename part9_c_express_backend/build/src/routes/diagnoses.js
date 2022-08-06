"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send(diagnosisService_1.default.getEntries());
});
router.post('/', function (req, res) {
    console.log('request received:', req);
    res.send('Diagnoses logged!');
});
exports.default = router;
