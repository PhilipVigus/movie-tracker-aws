const tableExists = async (db, tableName) => {
  const tableData = await db.listTables({}).promise();
  const tableNames = tableData.TableNames;

  return tableNames.includes(tableName);
};

module.exports = tableExists;