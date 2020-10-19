const parseRssFeed = require("../parseRssFeed");
const rssTestData = require("./fixtures/rssTestData");
const parsedRssTestData = require("./fixtures/parsedRssTestData");

describe("parseRssFeed", () => {
  it("parses the RssData", () => {
    expect(parseRssFeed(rssTestData)).toEqual(parsedRssTestData);
  });
});
