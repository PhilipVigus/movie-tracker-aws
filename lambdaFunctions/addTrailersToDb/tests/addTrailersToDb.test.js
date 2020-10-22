const AWS = require('aws-sdk');
const dbConfig = require("./fixtures/dbConfig");
const Axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
Axios.defaults.adapter = require("axios/lib/adapters/http");

const rssTestData = require("./fixtures/rssTestData");
const createTable = require("../createTable");
const deleteTable = require("../deleteTable");
const tableParams = require("./fixtures/testTableParams");
const addTrailersToDb = require('../addTrailersToDb.js');

describe('addTrailersToDb lambda function', function () {
    it('adds trailers to the database', async () => {
        const axiosMock = new MockAdapter(Axios);
        axiosMock
          .onGet("https://www.traileraddict.com/rss")
          .reply(200, rssTestData);

        tableParams.TableName = "movieTracker__test__trailers";
        const db = new AWS.DynamoDB(dbConfig);
        await createTable(db, tableParams);

        let event;
        let context;
        const result = await addTrailersToDb.lambdaHandler(event, context)
        const response = JSON.parse(result.body);
        const tableData = await db.describeTable({ TableName: tableParams.TableName }).promise();
        
        expect(result.statusCode).toEqual(200);
        expect(response.message).toEqual("Trailers added to database");
        expect(tableData.Table.ItemCount).toEqual(2);

        axiosMock.restore();
        await deleteTable(db, tableParams.TableName);
    });
});
