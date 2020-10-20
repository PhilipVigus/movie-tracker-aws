const AWS = require('aws-sdk');
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const tableExists = require('../tableExists');
const dbConfig = require("./fixtures/dbConfig");
const testTableParams = require("./fixtures/testTableParams");

describe("tableExists", () => {
  it("returns true if the table exists", async () => {
    const db = new AWS.DynamoDB(dbConfig);
    testTableParams.TableName = "testTable_exists";
    await createTable(db, testTableParams);
    expect(await tableExists(db, testTableParams.TableName)).toEqual(true);
    await deleteTable(db, testTableParams.TableName);
  });

  it("returns false if the table doesn't exist", async () => {
    const db = new AWS.DynamoDB(dbConfig);
    testTableParams.TableName = "testTable_doesnt_exist";
    expect(await tableExists(db, testTableParams.TableName)).toEqual(false);
  });
});