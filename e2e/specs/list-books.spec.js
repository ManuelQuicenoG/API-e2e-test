const axios = require('axios');
const { expect } = require('chai');

describe("When the user wants to list books",()=>{
    before(async()=>{
        response = await axios.get('https://milosen-booksback.herokuapp.com/books')
    })
    
    it("then it should return an ok status code", ()=>{
        expect(response.status).eql(200);
    })

    it("then it should return a list of books with id, name and author", ()=>{
        expect(response.data).not.eql(undefined);
        expect(response.data.length).to.be.greaterThan(0);
        const book = response.data[0];
        expect(book).to.have.property("id");
        expect(book).to.have.property("name");
        expect(book).to.have.property("author");
    })
});

describe("When the user wants to list a book that doesn't exist",()=>{
    before(async()=>{
        response = await axios.get('https://milosen-booksback.herokuapp.com/books')
    })
    it("then the book doesn't appear in the list", ()=>{
        let stop = 0;
        let bookSpec = "libro que no existe"
        let books = response.data;
        for (let index = 0; index < books.length && stop == 0; index++) {
            if(books[index].name == bookSpec){
                stop = 2;
            }
        }
        expect(stop).eql(0);
    })
});