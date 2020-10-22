const AWS = require('aws-sdk');
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const populateDbWithTrailers = require("../populateDbWithTrailers");
const dbConfig = require("./fixtures/dbConfig");
const trailerTableParams = require("../trailerTableParams");
const parsedRssTestData = require("./fixtures/parsedRssTestData");
const parsedRSSTestDataWithDuplicate = require("./fixtures/parsedRssTestDataWithDuplicate");

describe("populateDbWithTrailers", () => {
  it("adds the trailers to the db", async () => {
    const db = new AWS.DynamoDB(dbConfig);
    const document = new AWS.DynamoDB.DocumentClient(dbConfig);

    trailerTableParams.TableName = "testTable_populate"
    await createTable(db, trailerTableParams);
    await populateDbWithTrailers(document, parsedRssTestData, trailerTableParams.TableName);
    const tableData = await db.describeTable({ TableName: trailerTableParams.TableName }).promise();
    
    expect(tableData.Table.ItemCount).toEqual(2);

    await deleteTable(db, trailerTableParams.TableName);
  });

  it("prevents duplicate trailers being added to the db", async () => {
    const db = new AWS.DynamoDB(dbConfig);
    const document = new AWS.DynamoDB.DocumentClient(dbConfig);

    trailerTableParams.TableName = "testTable_preventDuplicates";
    await createTable(db, trailerTableParams);
    await populateDbWithTrailers(document, parsedRssTestData, trailerTableParams.TableName);
    await populateDbWithTrailers(document, parsedRSSTestDataWithDuplicate, trailerTableParams.TableName);
    const tableData = await db.describeTable({ TableName: trailerTableParams.TableName }).promise();
    
    expect(tableData.Table.ItemCount).toEqual(3);

    await deleteTable(db, trailerTableParams.TableName);
  });
});