const axios = require('axios');
const { expect } = require('chai');

let response;
let newbook = {
    "name": "new book to modify",
    "author": "author new book to modify"
};
let updtbook = {
    "name": "new book to modify edited",
    "author": "author new book to modify edited"
};
let creabook;
let updtdbook;
describe("given a created", () => {

    before(async () => {
        response = await axios.post('https://milosen-booksback.herokuapp.com/books', newbook);
        creabook = response.data;
    })

    describe("When the user wants to update a book", () => {

        before(async () => {
            response = await axios.put('https://milosen-booksback.herokuapp.com/books/'+creabook.id, updtbook);
            updtdbook = response.data;
        });

        it("then it should return an ok status code edit", () => {
            expect(response.status).eql(200);
        })

        it("then should return the new book edited", () => {
            expect(updtdbook.name).eql(updtbook.name);
        })

        after(async() => {
           await axios.delete('https://milosen-booksback.herokuapp.com/books/' + updtdbook.id);
        })
    });

    describe("When the user wants to edit a diferent object with property error and an id that doesnt exist ", () => {

        before(async () => {
            try {
                response = await axios.put('https://milosen-booksback.herokuapp.com/books/'+"randomid", new {"error":"error determined"});
            } catch (error) {
                response = "unexpected error";
            }
        });

        it("then it should return an exception that is not captured", () => {
            expect(response).eql("unexpected error");
        })

    });
});

