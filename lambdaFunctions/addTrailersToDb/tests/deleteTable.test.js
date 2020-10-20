const AWS = require('aws-sdk');
const createTable = require("../createTable.js");
const deleteTable = require("../deleteTable.js");
const tableExists = require('../tableExists');
const dbConfig = require("./fixtures/dbConfig");
const testTableParams = require('./fixtures/testTableParams.js');

describe("deleteTable", () => {
  it("deletes a table", async () => {
    const db = new AWS.DynamoDB(dbConfig);

    testTableParams.TableName = "testTable_delete"
    await createTable(db, testTableParams);
    expect(await tableExists(db, testTableParams.TableName)).toEqual(true);
    const result = await deleteTable(db, testTableParams.TableName);
    
    expect(result).toBeDefined();
  });
});