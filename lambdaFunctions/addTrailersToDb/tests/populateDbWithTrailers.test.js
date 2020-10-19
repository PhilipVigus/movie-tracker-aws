const AWS = require('aws-sdk');
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const populateDbWithTrailers = require("../populateDbWithTrailers");
const dbConfig = require("./fixtures/dbConfig");
const trailerTableParams = require("../trailerTableParams");
const parsedRssTestData = require("./fixtures/parsedRssTestData");

describe("populateDbWithTrailers", () => {
  it("adds the trailers to the db", async () => {
    const db = new AWS.DynamoDB(dbConfig);
    const document = new AWS.DynamoDB.DocumentClient(dbConfig);

    await createTable(db, trailerTableParams);
    await populateDbWithTrailers(document, parsedRssTestData, trailerTableParams.TableName);
    const tableData = await db.describeTable({ TableName: trailerTableParams.TableName }).promise();
    
    expect(tableData.Table.ItemCount).toEqual(2);

    await deleteTable(db, trailerTableParams.TableName);
  });
});