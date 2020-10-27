const trailerExists = require("./trailerExists");

const populateDbWithTrailers = async (document, trailers, tableName) => {
  for (let trailer of trailers) {
    console.log("Before exists call");
    const isTrailerAlreadyInDb = await trailerExists(document, tableName, trailer.id);
    console.log("After exists call");
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
      console.log(`${trailer.id} - added to database`);
    } else {
      console.log(`${trailer.id} - already added`);
    }
  }
}

module.exports = populateDbWithTrailers;