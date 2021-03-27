const axios = require('axios');
const { expect } = require('chai');

let response;
const newbook = {
    "name": "Prueba borrar",
    "author": "Autor Prueba borrar"
};
let created;
describe("given a created", () => {
    before(async () => {
        response = await axios.post('https://milosen-booksback.herokuapp.com/books', newbook);
        created = response.data;
    })

    describe("When the user wants to delete a book", () => {

        before(async () => {
            response = await axios.delete('https://milosen-booksback.herokuapp.com/books/' + created.id);
            response = await axios.get('https://milosen-booksback.herokuapp.com/books');
        });

        it("then it should return an ok status code", () => {
            expect(response.status).eql(200);
        })

        it("then the book deleted doesnt exist", () => {
            let stop = 0;
            let books = response.data;
            for (index = 0; index < response.data.length && stop==0; index++) {
                if (books[index].id == created.id) {
                    stop = 2;
                }
            }
            expect(stop).eql(0);
        })
    });
    describe("When the user wants to delete a book doesnt exist", () => {
        before(async () => {
            booksInitial = await axios.get('https://milosen-booksback.herokuapp.com/books');
            await axios.delete('https://milosen-booksback.herokuapp.com/books/' + "unknown id");
            booksLater = await axios.get('https://milosen-booksback.herokuapp.com/books');
        });

        it("then no exist changes in the database", () => {
            expect(booksInitial.data).eql(booksLater.data);
        })

    });
});