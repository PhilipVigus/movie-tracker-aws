const AWS = require('aws-sdk');
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const trailerExists = require("../trailerExists");
const dbConfig = require("./fixtures/dbConfig");
const testTableParams = require("./fixtures/testTableParams");
const trailerTestData = require("../tests/fixtures/trailerTestData");

describe("trailerExists", () => {
  it("returns true if the trailer exists in the trailers table", async () => {   
    const db = new AWS.DynamoDB(dbConfig);
    const document = new AWS.DynamoDB.DocumentClient(dbConfig);

    testTableParams.TableName = trailerTestData.TableName;
    await createTable(db, testTableParams);
    await document.put(trailerTestData).promise(); 

    expect(await trailerExists(document, trailerTestData.TableName, trailerTestData.Item.id)).toEqual(true);

    await deleteTable(db, testTableParams.TableName);
  });

  it("returns false if the trailer doesn't exist in the trailers table", async () => {
    const db = new AWS.DynamoDB(dbConfig);
    const document = new AWS.DynamoDB.DocumentClient(dbConfig);

    testTableParams.TableName = trailerTestData.TableName;
    await createTable(db, testTableParams);

    expect(await trailerExists(document, trailerTestData.TableName, trailerTestData.Item.id)).toEqual(false);
    
    await deleteTable(db, testTableParams.TableName);
  });
});