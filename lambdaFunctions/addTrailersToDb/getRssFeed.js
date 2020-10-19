const Axios = require("axios");
Axios.defaults.adapter = require("axios/lib/adapters/http");

const getRssData = async () => {
  try {
    const data = await Axios.get("https://www.traileraddict.com/rss");
    return data;
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = getRssData;
