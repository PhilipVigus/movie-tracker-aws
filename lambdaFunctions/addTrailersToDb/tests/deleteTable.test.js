const AWS = require('aws-sdk');
const createTable = require("../createTable.js");
const deleteTable = require("../deleteTable.js");
const dbConfig = require("./fixtures/dbConfig");
const testTableParams = require('./fixtures/testTableParams.js');

describe("deleteTable", () => {
  it("deletes a table", async () => {
    const db = new AWS.DynamoDB(dbConfig);

    await createTable(db, testTableParams);
    const result = await deleteTable(db, testTableParams.TableName);
    
    expect(result).toBeDefined();
  });
});