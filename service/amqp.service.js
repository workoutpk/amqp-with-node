const amqplib = require('amqplib/callback_api');
const queue = 'SERVICE_';
const CONN_URL = 'amqps://bisavyjw:FnYwS777FKZs2J7voWyLrA5_P-oHyN73@chimpanzee.rmq.cloudamqp.com/bisavyjw';



amqplib.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel1) {
        try {
            ch1 = channel1;
            if (err) throw err;
            ch1.assertQueue("SERVICE1");
            ch1.prefetch(200);
            ch1.consume("SERVICE1", async (msg) => {
                if (msg !== null) {
                    console.log("SERVICE1" + msg.content.toString());
                    ch1.ack(msg);
                } else {
                    console.log('Consumer cancelled by server');
                }
            });
            console.log("SERVICE1 CONSUMER READY ::")
        } catch (error) {
            console.log("Error of service 1 ::" + JSON.stringify(error))
        }

    });
    conn.createChannel(function (err, channel2) {
        try {
            ch2 = channel2;
            if (err) throw err;
            ch2.assertQueue("SERVICE2");
            ch2.prefetch(200);
            ch2.consume("SERVICE2", async (msg) => {
                if (msg !== null) {
                    console.log("SERVICE2" + msg.content.toString());
                    ch2.ack(msg);
                } else {
                    console.log('Consumer cancelled by server');
                }
            });
            console.log("SERVICE2 CONSUMER READY ::")
        } catch (error) {
            console.log("Error :: " + JSON.stringify(error))
        }

    });
});
// (function async() {
//     //body of the function
//     amqplib.connect('amqps://bisavyjw:FnYwS777FKZs2J7voWyLrA5_P-oHyN73@chimpanzee.rmq.cloudamqp.com/bisavyjw', (err, conn) => {
//        if (err) throw err;

//        // Listener
//        conn.createChannel((err, ch2) => {
//            if (err) throw err;

//            ch2.assertQueue(queue);

//            ch2.consume(queue, (msg) => {
//                if (msg !== null) {
//                    console.log(msg.content.toString());
//                    ch2.ack(msg);
//                } else {
//                    console.log('Consumer cancelled by server');
//                }
//            });
//        });

//        // Sender
//        conn.createChannel((err, ch1) => {
//            if (err) throw err;

//            ch1.assertQueue(queue);

//            // setInterval(() => {
//            //     ch1.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
//            // }, 1000);
//        });
//    });

// })(arguments);


exports.publishToQueue = async (queueName, data) => {
    ch1.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    // ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
}

//manually consuming
exports.consume_one = async (queue, isNoAck = false, durable = false, prefetch = null) => {
    // ch.sendToQueue(queue, Buffer.from('index service !!'));
    ch.assertQueue(queue);

    ch.consume(queue, (msg) => {
        if (msg !== null) {
            console.log(msg.content.toString());
            ch.ack(msg);
        } else {
            console.log('Consumer cancelled by server');
        }
    });
}

const consume_two = async (queue, isNoAck = false, durable = false, prefetch = null) => {
    const connect = await amqp.connect(config.rabbitMqUrl)
    const channel = await connect.createChannel()

    await channel.assertQueue(queue, { durable })

    if (prefetch) {
        channel.prefetch(prefetch)
    }
    const consumeEmitter = new EventEmitter()
    try {
        channel.consume(queue, message => {
            if (message !== null) {
                consumeEmitter.emit('data', message.content.toString(), () => channel.ack(message))
            } else {
                const error = new Error('NullMessageException')
                consumeEmitter.emit('error', error)
            }
        }, { noAck: isNoAck })
    } catch (error) {
        consumeEmitter.emit('error', error)
    }
    return consumeEmitter
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
})