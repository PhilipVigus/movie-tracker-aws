const AWS = require('aws-sdk');
const dbConfig = require("./tests/fixtures/dbConfig");
const createTable = require("./createTable");
const deleteTable = require("./deleteTable");
const tableExists = require("./tableExists");
const trailerTableParams = require("./trailerTableParams");

const db = new AWS.DynamoDB(dbConfig);
const DEV_TABLE_NAME = "movieTracker__dev__trailers";

const createDevTables = async () => {
  if (await tableExists(db, DEV_TABLE_NAME)) {
    await deleteTable(db, DEV_TABLE_NAME);
  }

  trailerTableParams.TableName = DEV_TABLE_NAME;
  await createTable(db, trailerTableParams);
};

createDevTables();
