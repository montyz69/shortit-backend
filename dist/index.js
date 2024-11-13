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
const db_1 = __importDefault(require("./db"));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
const myURL = "https://www.shortit.com";
function randomIdgenerator() {
    return Math.floor(Math.random() * 10 ** 13);
}
function toBase62(num) {
    const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    if (num === 0)
        return base62Chars[0];
    while (num > 0) {
        result = base62Chars[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result;
}
app.post('/hash-url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body.url;
    const id = randomIdgenerator();
    const shortUrl = toBase62(id);
    const response = yield db_1.default.url.create({
        data: {
            id: id,
            shortURL: shortUrl,
            longURL: url
        }
    });
    if (response) {
        res.status(200).json({
            shortUrl: `${myURL}/${shortUrl}`
        });
    }
    else {
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}));
app.get('/:shorturl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shorturl = req.params.shorturl;
    const response = yield db_1.default.url.findUnique({
        where: {
            shortURL: shorturl
        }
    });
    if (response) {
        const url = "https://" + response.longURL;
        res.redirect(url);
    }
    else {
        res.status(404).json({
            error: "Not Found"
        });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
