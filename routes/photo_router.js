var express = require('express');
var router = express.Router();

var http = require('http'),
    dns = require('dns'),
    fs = require('fs'),
    url = require('url'),
    querystring = require('querystring'),
    util = require('util'),
    path = require('path'),
    photoservice = require('../service/photo_service')


router.post('/', function (req, res, next) {
    photoservice.photo_upload(req, res, next);
})


module.exports = router;