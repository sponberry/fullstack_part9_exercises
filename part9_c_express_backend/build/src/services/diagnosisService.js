"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
var diagnoses = diagnoses_json_1.default;
var getEntries = function () {
    return diagnoses;
};
var addEntry = function () {
    return null;
};
exports.default = {
    getEntries: getEntries,
    addEntry: addEntry
};
