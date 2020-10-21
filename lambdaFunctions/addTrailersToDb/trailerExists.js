const trailerExists = async (document, tableName, trailerId) => {
  const params = {
    TableName: tableName,
    Key: {
      id: trailerId
    }
  }

  const result = await document.get(params).promise();
  if (result.Item !== undefined && result.Item !== null) {
    return true;
  } else {
    return false;
  }
};

module.exports = trailerExists;