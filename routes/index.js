var express = require('express');
var router = express.Router();
var IndexService = require("../service/amqp.service")
const queue = 'SERVICE1';
let data = {
    service: "Index Route",
    author: "pk",
    date: new Date(),
    time: new Date().getTime()

}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'RABBIT MQ' });
});


router.get("/text_send1", function (req, res, next) {
    IndexService.publishToQueue("SERVICE1", data)
    console.log("send data ....")
    res.render('index', { title: JSON.stringify(data) });
});
router.get("/text_send2", function (req, res, next) {
    IndexService.publishToQueue("SERVICE2", data)
    console.log("send data ....")
    res.render('index', { title: JSON.stringify(data) });
});
module.exports = router;
