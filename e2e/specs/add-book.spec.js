const axios = require('axios');
const { expect } = require('chai');

let response;
let newbook = {
    "name": "new book",
    "author": "author new book"
};
let newbookcreated;
describe("when the user wants to create a book", () => {
    before(async () => {
        response = await axios.post('https://milosen-booksback.herokuapp.com/books', newbook);
        newbookcreated = response.data;
    });

    it("then it should return an ok status code", () => {
        expect(response.status).eql(200);
    })

    it("then it should return the book", () => {
        expect(newbookcreated.name).eql(newbook.name);
    })

    after(async() => {
        await axios.delete('https://milosen-booksback.herokuapp.com/books/' + newbookcreated.id);
    })
});

describe("When the user wants to create a book with a new object with the property error instead of book", () => {

    before(async () => {

        try {
            response = await axios.post('https://milosen-booksback.herokuapp.com/books', new {"error": "intentofallido"});
        } catch (error) {
            response = "inesperado error";
        }


    });

    it("then it should return an exception is not captured", () => {
        expect(response).eql("inesperado error");
    })

});