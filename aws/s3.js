const {S3} = require('aws-sdk');

class S3Processor {
    constructor() {
        this.s3 = new S3();
    }

    async getItem(bucket, key) {
        const {Body} = await this.s3.getObject({
            Bucket: bucket,
            Key: key,
        }).promise();

        return Body;
    }

    async getJsonItem(bucket, key) {
        const item = await this.getItem(bucket, key);

        return JSON.parse(item.toString());
    }
}

module.exports = new S3Processor();
