const passport = require('passport')
const express = require('express');
const app = express()
const Body_parser = require('body-parser')
const compression = require('compression')
const expressSession = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const formidable = require('formidable');
const port = process.env.PORT || 3000;

require('./Apps/Kernel')(app, express, Body_parser, passport, compression, cookieParser, flash, expressSession, formidable)
require('./Config/passport-config')(passport)

app.listen(9999)

app.use('/', require('./router/web'))

app.use((req, res) => {
    res.end('Not Found')
})