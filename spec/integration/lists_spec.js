const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {

  beforeEach((done) => {
     this.list;
     sequelize.sync({force: true}).then((res) => {

      List.create({
        title: "Thanksgiving Party"
      })
       .then((list) => {
         this.list = list;
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });

describe("POST /lists/:id/update", () => {
  it("should update the list title with new values", (done) => {
      const options = {
         url: `${base}${this.list.id}/update`,
         form: {
           title: "Birthday Party"
         }
       };
       request.post(options, (err, res, body) => {
         expect(err).toBeNull();

         List.findOne({
           where: { id: this.list.id }
         })
         .then((list) => {
           expect(list.title).toBe("Birthday Party");
           done();
         });
       });
  });
});

   describe("GET /lists/:id/edit", () => {
     it("should render a view of an edit list title form", (done) =>{
       request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit List Title");
         done();
       });
     });
   });


   describe("POST /lists/:id/destroy", () => {
     it("should delete the list with the associated ID", (done) => {
       List.all()
       .then((lists) => {
         const listCountBeforeDelete = lists.length;
            expect(listCountBeforeDelete).toBe(1);

            request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
              List.all()
              .then((lists) => {
                expect(err).toBeNull();
                expect(lists.length).toBe(listCountBeforeDelete - 1);
                done();
              })
            });
          });
     });
   });




   describe("GET /lists/:id", () => {

    it("should render a view with the selected list", (done) => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Thanksgiving Party");
          done();
      });
    });
   });


   describe("GET /lists/new", () => {

      it("should render a new list form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New List");
          done();
        });
      });
    });



    describe("POST /lists/create", () => {
        const options = {
          url: `${base}create`,
          form: {
            title: "Thanksgiving Party"
          }
        };

        it("should create a new list and redirect", (done) => {
        request.post(options,
            (err, res, body) => {
              List.findOne({where: {title: "Thanksgiving Party"}})
              .then((list) => {
                expect(res.statusCode).toBe(303);
                expect(list.title).toBe("Thanksgiving Party");
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


  describe("GET /lists", () => {

    it("should return a status code 200 and all lists", (done) => {

   //#3
          request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("Lists");
            expect(body).toContain("Thanksgiving Party");
            done();
          });
        });
      });



});
