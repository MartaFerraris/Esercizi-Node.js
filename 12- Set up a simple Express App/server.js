"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-async-errors");
var morgan_1 = require("morgan");
var dotenv_1 = require("dotenv");
var planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(function (req, res, next) {
    res.status(404).json({ error: 'not found 404' });
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'internal error 500' });
});
app.get('/planets', function (req, res) {
    res.json(planets);
});
app.listen(port, function () {
    console.log("http://localhost:".concat(port));
});
