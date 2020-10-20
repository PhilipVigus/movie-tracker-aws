const Axios = require("axios");
Axios.defaults.adapter = require("axios/lib/adapters/http");

const getRssData = async () => {
  const feed = await Axios.get("https://www.traileraddict.com/rss");
  return feed.data;
};

module.exports = getRssData;
