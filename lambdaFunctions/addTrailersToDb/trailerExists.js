const trailerExists = async (document, tableName, trailerId) => {
  console.log("in trailerExists");
  console.log(tableName);
  console.log(trailerId);
  const params = {
    TableName: tableName,
    Key: {
      id: trailerId
    }
  }

  console.log(params);
  try {
    console.log("before result");
    const result = await document.get(params).promise();
    console.log("after result");
    if (result.Item !== undefined && result.Item !== null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(`Error = ${e}`);
  }
};

module.exports = trailerExists;