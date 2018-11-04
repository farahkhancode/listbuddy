const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("Item", () => {

  beforeEach((done) => {
//#1
    this.list;
    this.item;
    sequelize.sync({force: true}).then((res) => {

//#2
      List.create({
        title: "Birthday Party"
      })
      .then((list) => {
        this.list = list;
//#3
        Item.create({
          description: "6 Blue and 6 Silver Helium Balloons-in 2 bunches",
          isPurchased: true
//#4
          listId: this.list.id
        })
        .then((item) => {
          this.item = item;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#getList()", () => {

     it("should return the associated list for the item", (done) => {

       this.item.getList()
       .then((associatedList) => {
         expect(associatedList.title).toBe("Birthday Party");
         done();
       });

     });

   });

  describe("#setList()", () => {

     it("should associate a list and an item together", (done) => {
       List.create({
         title: "Birthday Party"
       })
       .then((newList) => {
        expect(this.item.listId).toBe(this.list.id);

         this.item.setList(newList)
         .then((item) => {
            console.log(item.listId);
           expect(item.listId).toBe(newList.id);
           done();

         });
       })
     });

   });

  describe("#create()", () => {

    it("should not create an item with missing description, or assigned list", (done) => {
    Item.create({
      description: "Cake",
      listId: this.list.id
    })
    .then((item) => {
      console.log(item.listId);
      done();

    })
    .catch((err) => {

      expect(err.message).toContain("Item.description cannot be null");
      expect(err.message).toContain("Item.listId cannot be null");
      done();

    })
  });

    it("should create an item object with a description, boolean, and assigned list", (done) => {
      Item.create({
        description: "Cake",
        isPurchased: true,
        listId: this.list.id
      })
      .then((item) => {
        expect(item.description).toBe("Cake");
        expect(item.isPurchased).toBeTrue();
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});
