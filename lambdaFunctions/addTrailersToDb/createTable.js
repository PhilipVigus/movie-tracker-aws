const AWS = require('aws-sdk');
const config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"us-west-2",
  "endpoint": "http://localhost:8000"
}
const dynamodb = new AWS.DynamoDB(config);

const createTable = (params) => {
  dynamodb.createTable(params)
    .promise()
    .then(data => console.log("Created table", data))
    .catch(console.error);
};

module.exports = createTable;