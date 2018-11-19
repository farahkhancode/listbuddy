const itemQueries = require("../db/queries.items.js");
const listQueries = require("../db/queries.lists.js");

module.exports = {

  new(req, res, next){
     res.render("items/new", {listId: req.params.listId});
   },

  create(req, res, next){
    let newItem= {
         description: req.body.description,
         isPurchased: req.body.isPurchased,
         listId: req.params.listId
       };
        itemQueries.addItem(newItem, (err, item) => {
         if(err){
           res.redirect(500, "/items/new");
         } else {
           res.redirect(303, `/lists/${newItem.listId}`);
         }
       });
     },


destroy(req, res, next){
     itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
       if(err){
         res.redirect(500, `/lists/${req.params.listId}`)
       } else {
         res.redirect(303, `/lists/${req.params.listId}`)
       }
     });
   },

update(req, res, next){
      console.log(req.body);
     itemQueries.updateItem(req.params.id, req.body, (err, item) => {
       if(err || item == null){
         console.log(req.body);
         res.redirect(404, `/lists/${req.params.listId}/items/${req.params.id}/edit`);
       } else {
         console.log(req.body);
         res.redirect(`/lists/${req.params.listId}`);
       }
     });
   },

   edit(req, res, next){
    itemQueries.getItem(req.params.id, (err, item) => {
      if(err || item == null){
        res.redirect(404, "/");
      } else {
        res.render("items/edit", {item});
      }
    });
  }


}
