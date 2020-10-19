const deleteTable = async (db, tableName) => {
  const result = await db.deleteTable({ TableName: tableName }).promise();
  return result;
};

module.exports = deleteTable;