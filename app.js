"use strict"
const createError = require('http-errors');
const express = require('express');
const path = require('path');

require("dotenv").config();
require("cors")();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());



// Router 설정
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Router 사용

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});
app.use((req, res) => {
  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});
app.listen(process.env.PORT, () =>
    console.log(`${process.env.PORT} port is listening...`)
);

module.exports = app;
