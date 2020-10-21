const AWS = require('aws-sdk');
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const trailerExists = require("../trailerExists");
const dbConfig = require("./fixtures/dbConfig");
const testTableParams = require("./fixtures/testTableParams");

describe("trailerExists", () => {
  it("returns true if the trailer exists in the trailers table", async () => {
    const trailer = {
      TableName: "testTable_trailerExists",
      Item: {
        id: "Test trailer id",
        title: "Test trailer title",
        date: "Test trailer date",
        link: "Test trailer link",
        image: "Test trailer image",
        tags: ["Tag 1", "Tag 2"]
      }
    };
    
    const db = new AWS.DynamoDB(dbConfig);
    const document = new AWS.DynamoDB.DocumentClient(dbConfig);

    testTableParams.TableName = "testTable_trailerExists";
    await createTable(db, testTableParams);
    await document.put(trailer).promise(); 
    expect(await trailerExists(trailer.Item.id)).toEqual(true);
    await deleteTable(db, testTableParams.TableName);
  });
});