const AWS = require('aws-sdk');
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const dbConfig = require("./fixtures/dbConfig");
const testTableParams = require("./fixtures/testTableParams");

describe("createTable", () => {
  it("creates a table", async () => {
    const db = new AWS.DynamoDB(dbConfig);

    testTableParams.TableName = "testTable_create"
    const result = await createTable(db, testTableParams);
    expect(result).toBeDefined();

    await deleteTable(db, testTableParams.TableName);
  });
});