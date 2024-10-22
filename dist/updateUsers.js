"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./models/user"));
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const dburl = process.env.dburl || '';
function connectToMongo(dburl) {
    return __awaiter(this, void 0, void 0, function* () {
        const retryAttempts = 3;
        const connectTimeoutMS = 20000;
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
            try {
                yield mongoose.connect(dburl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    connectTimeoutMS,
                });
                console.log('Connected to Database');
                return;
            }
            catch (error) {
                console.error(`Connection attempt ${attempt} failed:`, error.message);
                yield new Promise((resolve) => setTimeout(resolve, Math.min(attempt * 2000, 10000)));
            }
        }
    });
}
connectToMongo(dburl)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    yield user_1.default.updateMany({}, {
        $set: {
            newField1: "defaultValue1",
            newField2: 0,
            // Set other new fields with their default values here
        },
    });
}));
