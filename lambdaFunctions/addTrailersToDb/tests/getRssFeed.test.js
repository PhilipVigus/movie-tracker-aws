const Axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const getRssFeed = require("../getRssFeed");
const rssTestData = require("./fixtures/rssTestData");
Axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getRssFeed", () => {
  it("returns the RSS feed", async () => {
    const axiosMock = new MockAdapter(Axios);
    axiosMock
      .onGet("https://www.traileraddict.com/rss")
      .reply(200, rssTestData);

    const rssFeedData = await getRssFeed();
    expect(rssFeedData.data).toEqual(rssTestData);

    axiosMock.restore();
  });
});
