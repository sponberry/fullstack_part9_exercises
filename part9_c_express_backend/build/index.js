"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var diagnoses_1 = __importDefault(require("./src/routes/diagnoses"));
var patients_1 = __importDefault(require("./src/routes/patients"));
var app = express();
app.use(cors());
app.use(express.json());
var PORT = 3003;
app.get('/api/ping', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
