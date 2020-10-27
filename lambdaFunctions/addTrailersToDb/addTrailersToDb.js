require('dotenv').config();
const AWS = require('aws-sdk');
const dbConfig = require("./tests/fixtures/dbConfig");
const getRssFeed = require("./getRssFeed");
const parseRssFeed = require("./parseRssFeed");
const populateDbWithTrailers = require("./populateDbWithTrailers");

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    let response;

    try {
        const rssFeedData = await getRssFeed();
        const parsedTrailers = parseRssFeed(rssFeedData);
        console.log(parsedTrailers.length);
        console.log(dbConfig);
        const document = new AWS.DynamoDB.DocumentClient(dbConfig);
        const db = new AWS.DynamoDB(dbConfig);
        const tables = await db.listTables().promise();
        console.log("tables");
        console.log(tables);
        let tableName;
        if(process.env.NODE_ENV === "test") {
            console.log("testing");
            tableName = "movieTracker__test__trailers";
        } else {
            console.log("devving");
            tableName = "movieTracker__dev__trailers";
        }

        await populateDbWithTrailers(document, parsedTrailers, tableName);

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Trailers added to database',
            })
        }
    } catch (err) {
        response = {
            'statusCode': 420,
            'body': JSON.stringify({
                message: 'Error adding trailers to database',
            })
        }
    }

    return response
};
