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
    dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error("Unable to create table", err);
    } else {
      console.log("Created table", data);
    }
  });
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

createTable(p);

module.exports = { createTable }