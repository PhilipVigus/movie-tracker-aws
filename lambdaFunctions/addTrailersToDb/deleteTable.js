var AWS = require('aws-sdk');
var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"us-west-2",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

function deleteTable(params) {
    dynamodb.deleteTable(params)
      .promise()
      .then(data => console.log("Deleted table", data))
      .catch(console.error);
}

const p = {
  TableName: "Movies"
};

async function runDeleteTable() {
  await deleteTable(p);
}

runDeleteTable(p);

module.exports = { deleteTable }