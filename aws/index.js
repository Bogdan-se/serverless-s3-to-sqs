const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;

const s3Processor = require('./s3');
const SQSProcessor = require('./sqs');

module.exports = {
    s3Processor,
    SQSProcessor,
}