const testTableParams = {
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

module.exports = testTableParams;