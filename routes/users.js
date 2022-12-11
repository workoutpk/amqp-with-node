var express = require('express');
var router = express.Router();
const amqplib = require('amqplib/callback_api');
const queue = 'tasks';
const IndexService = require('../service/amqp.service')
/* GET users listing. */
router.get('/', function (req, res, next) {
    // amqplib.connect('amqp://localhost', (err, conn) => {
    // amqplib.connect('amqps://bisavyjw:FnYwS777FKZs2J7voWyLrA5_P-oHyN73@chimpanzee.rmq.cloudamqp.com/bisavyjw', (err, conn) => {
    //     if (err) throw err;
    //     // console.log("api working ..");
    //     // Listener
    //     conn.createChannel((err, ch2) => {
    //         if (err) throw err;

    //         ch2.assertQueue(queue);

    //         ch2.consume(queue, (msg) => {
    //             if (msg !== null) {
    //                 console.log(msg.content.toString());
    //                 ch2.ack(msg);
    //             } else {
    //                 console.log('Consumer cancelled by server');
    //             }
    //         });
    //     });

    //     // Sender
    //     conn.createChannel((err, ch1) => {
    //         if (err) throw err;

    //         ch1.assertQueue(queue);

    //         // setInterval(() => {
    //         //     ch1.sendToQueue(queue, Buffer.from('something to do'));
    //         // }, 1000);
    //     });
    // });
    res.send('respond with a resource');
});

router.get("/text_get",function(req,res,next){
    console.log("Consume Msg::  ")
    IndexService.consume();
    res.render('index', { title: "got it::  "})
})

module.exports = router;
