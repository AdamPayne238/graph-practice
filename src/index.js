
require('dotenv').config()

const express = require('express')
const server = require('./server')

server.express.use('/doc', express.static("doc/schema"))

server.start(() => console.log(`No errors on http://localhost:5001`))