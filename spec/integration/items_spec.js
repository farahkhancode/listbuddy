const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

  beforeEach((done) => {
    this.item;
    this.list;

    sequelize.sync({force: true}).then((res) => {

//#1
      List.create({
        title: "Back to School"
      })
      .then((list) => {
        this.list = list;

        Item.create({
          description: "12 HB #2 pencils",
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
         expect(body).toContain("12 HB #2 pencils");
         done();
       });
     });

   });

   describe("POST /lists/:listId/items/:id/update", () => {

     it("should return a status code 302", (done) => {
       request.post({
         url: `${base}/${list.id}/items/${item.id}/update`,
         form: {
           description: "12 HB #2 pencils"
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
             description: "Spiral notebooks"
           }
         };
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();

           Item.findOne({
             where: {id: this.item.id}
           })
           .then((item) => {
             expect(item.description).toBe("Spiral notebooks");
             done();
           });
         });
     });

   });

  describe("POST /lists/:listId/items/:id/destroy", () => {

    it("should delete the item with the associated ID", (done) => {

      expect(item.id).toBe(1);

      request.post(`${base}/${this.item.id}/items/${this.item.id}/destroy`, (err, res, body) => {

        Item.findById(1)
        .then((item) => {
          expect(err).toBeNull();
          expect(item).toBeNull();
          done();
        })
      });

    });

  });

  describe("GET /lists/:listId/items/new", () => {

      it("should render a new item form", (done) => {
        request.get(`${base}/${item.id}/items/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Item");
          done();
        });
      });
  });


  describe("POST /lists/:listId/items/create", () => {

   it("should not create a new item that fails validations", (done) => {
       const options ={
         url: `${base}/${this.list.id}/posts/create`,
           form: {
             description: "a"
           }
         };
         request.post(options,
              (err, res, body) => {
                Item.findOne({where: {description: "a"}})
                .then((item) => {
                    expect(item).toBeNull();
                    done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              }
            );
          });


   it("should create a new item and redirect", (done) => {
      const options = {
        url: `${base}/${this.item.id}/items/create`,
        form: {
          description: "Cake"
        }
      };
      request.post(options,
        (err, res, body) => {

          Item.findOne({where: {description: "Cake"}})
          .then((item) => {
            expect(item).not.toBeNull();
            expect(item.description).toBe("Cake");
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
