const Axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const getRssFeed = require("../getRssFeed");
const rssTestData = require("./fixtures/rssTestData");

Axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getRssData", () => {
  it("returns the RSS feed", async () => {
    const axiosMock = new MockAdapter(Axios);
    axiosMock
      .onGet("https://www.traileraddict.com/rss")
      .reply(200, rssTestData);

    const rssData = await getRssFeed();
    expect(rssData.data).toEqual(rssTestData);

    axiosMock.restore();
  });
});
