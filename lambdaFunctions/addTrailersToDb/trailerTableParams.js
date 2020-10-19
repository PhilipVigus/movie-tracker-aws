const trailerTableParams = {
  TableName: "trailers",
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

module.exports = trailerTableParams;