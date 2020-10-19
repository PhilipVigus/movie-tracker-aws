const createTable = async (db, params) => {
  const result = await db.createTable(params).promise();
  return result;
};

module.exports = createTable;