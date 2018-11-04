const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

  beforeEach((done) => {
    this.item;
    this.item;

    sequelize.sync({force: true}).then((res) => {

//#1
      List.create({
        title: "Back to School"
      })
      .then((item) => {
        this.item = item;

        Item.create({
          title: "12 HB #2 pencils",
          itemId: this.item.id
        })
        .then((item) => {
          this.item = item;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /lists/:listId/items/:id/edit", () => {

     it("should render a view with an edit item form", (done) => {
       request.get(`${base}/${this.list.id}/items/${this.item.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Item");
         expect(body).toContain("Back to School");
         done();
       });
     });

   });

   describe("POST /lists/:listId/items/:id/update", () => {

     it("should return a status code 302", (done) => {
       request.item({
         url: `${base}/${list.id}/items/${item.id}/update`,
         form: {
           description: "Back to School"
         }
       }, (err, res, body) => {
         expect(res.statusCode).toBe(302);
         done();
       });
     });

     it("should update the item with the given values", (done) => {
         const options = {
           url: `${base}/${this.list.id}/items/${this.item.id}/update`,
           form: {
             description: "Thanksgiving Party"
           }
         };
         request.item(options,
           (err, res, body) => {

           expect(err).toBeNull();

           Item.findOne({
             where: {id: this.item.id}
           })
           .then((item) => {
             expect(item.title).toBe("Thanksgiving Party");
             done();
           });
         });
     });

   });

  describe("POST /items/:itemId/items/:id/destroy", () => {

    it("should delete the item with the associated ID", (done) => {

      expect(item.id).toBe(1);

      request.item(`${base}/${this.item.id}/items/${this.item.id}/destroy`, (err, res, body) => {

        Item.findById(1)
        .then((item) => {
          expect(err).toBeNull();
          expect(item).toBeNull();
          done();
        })
      });

    });

  });

  describe("GET /items/:itemId/items/new", () => {

      it("should render a new item form", (done) => {
        request.get(`${base}/${item.id}/items/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Item");
          done();
        });
      });
  });


  describe("POST /items/:itemId/items/create", () => {

   it("should create a new item and redirect", (done) => {
      const options = {
        url: `${base}/${this.item.id}/items/create`,
        form: {
          description: "Cake"
        }
      };
      request.item(options,
        (err, res, body) => {

          Item.findOne({where: {description: "Cake"}})
          .then((item) => {
            expect(item).not.toBeNull();
            expect(item.title).toBe("Cake");
            expect(item.itemId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

 });



});
