const app = require('../addTrailersToDb.js');
describe('Tests index', function () {
    it('verifies successful response', async () => {
        let event;
        let context;
        const result = await app.lambdaHandler(event, context)
        const response = JSON.parse(result.body);
        expect(result.statusCode).toEqual(200);
        expect(response.message).toEqual("hello world");
        expect(response.env).toEqual("test");
    });
});
