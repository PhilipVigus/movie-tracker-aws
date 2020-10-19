const parseRssData = require("../parseRssFeed");
const rssTestData = require("./fixtures/rssTestData");
const parsedRssTestData = require("./fixtures/parsedRssTestData");

describe("parseRssData", () => {
  it("parses the RssData", () => {
    expect(parseRssData(rssTestData)).toEqual(parsedRssTestData);
  });
});
