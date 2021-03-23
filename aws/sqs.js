const {SQS} = require('aws-sdk');

class SQSProcessor {
    constructor() {
        this.sqs = new SQS();
    }

    async sendJsonMessage(message) {
        const result = await this.sqs.sendMessage({
            MessageBody: JSON.stringify(message),
            QueueUrl: process.env.QUEUE_URL
        }).promise();
        console.log(message);
    }
}

module.exports = new SQSProcessor();
