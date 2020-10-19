const populateDbWithTrailers = async (document, trailers, tableName) => {
  for (let trailer of trailers) {
    await document.put(
      { 
        TableName: tableName,
        Item: { 
          id: trailer.id,
          title: trailer.title,
          date: trailer.date,
          link: trailer.link,
          image: trailer.image,
          tags: trailer.tags
        }
      }
    ).promise();  
  }
}

module.exports = populateDbWithTrailers;