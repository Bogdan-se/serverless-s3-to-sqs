const {s3Processor, SQSProcessor} = require('./aws');
const {chunk} = require('./utils');
const {DYNAMODB_BATCH_SIZE} = require('./const');

module.exports.processS3ToSQS = async ({Records}) => {
    console.log(`Received records ${JSON.stringify(Records)}`);

    await Promise.all(Records.map(async record => {
        try {
            const items = await s3Processor.getJsonItem(record.s3.bucket.name, record.s3.object.key);
            console.log(`Got items ${JSON.stringify(items)}`);

            const chunks = chunk(items, DYNAMODB_BATCH_SIZE);

            await Promise.all(chunks.map(async chunk => {
                await SQSProcessor.sendJsonMessage(chunk);
                console.log(`Message sent ${JSON.stringify(chunk)}`);
            }));
        } catch (error) {
            console.error(error);
        }
    }));
};
