var AWS = require('aws-sdk');
var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"us-west-2",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

function createTable(params) {
  dynamodb.createTable(params)
    .promise()
    .then(data => console.log("Created table", data))
    .catch(console.error);
}

const p = {
  TableName: "Movies",
  KeySchema: [{ AttributeName: "title", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "title", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

async function runCreateTable() {
  await createTable(p);
}
runCreateTable();

module.exports = { createTable }