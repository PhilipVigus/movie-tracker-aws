const axios = require("axios");

const getRssData = async () => {
  try {
    const data = await axios.get("https://www.traileraddict.com/rss");
    return data;
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = getRssData;
