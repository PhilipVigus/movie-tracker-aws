const trailerExists = require("./trailerExists");

const populateDbWithTrailers = async (document, trailers, tableName) => {
  for (let trailer of trailers) {
    const isTrailerAlreadyInDb = await trailerExists(document, tableName, trailer.id);
    if (!isTrailerAlreadyInDb) {
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
}

module.exports = populateDbWithTrailers;