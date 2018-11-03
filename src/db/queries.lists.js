const List = require("./models").List;

module.exports = {

//#1
  getAllLists(callback){
    return List.all()

//#2
    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
