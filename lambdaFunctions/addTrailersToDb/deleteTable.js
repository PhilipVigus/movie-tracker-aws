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
    dynamodb.deleteTable(params, function(err, data) {
    if (err) {
      console.error("Unable to delete table", err);
    } else {
      console.log("Deleted table", data);
    }
  });
}

const p = {
  TableName: "Movies"
};

deleteTable(p);

module.exports = { deleteTable }