const AWS = require('aws-sdk');
const createTable = require("../createTable.js");
const deleteTable = require("../deleteTable.js");

describe("createTable", () => {
  const config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": "abcde",
    "secretAccessKey": "abcde",
    "region":"us-west-2",
    "endpoint": "http://localhost:8000"
  }

  const dynamodb = new AWS.DynamoDB(config);

  afterEach(async () => {
    //await deleteTable(dynamodb, "testTable");
  });

  it("creates a table", async () => {


    const params = {
      TableName: "testTable",
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    };

    const result = await createTable(dynamodb, params);
    await deleteTable(dynamodb, "testTable");
    expect(result.TableDescription.ItemCount).toBe(0);
  });
});