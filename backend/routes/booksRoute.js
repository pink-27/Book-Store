import express from "express";
import { Book } from "../models/bookModel.js";

const router=express.Router() 
// Add a book to DB
router.post('/', async (request,response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message: "All fields not fullfiled for the book"})
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        }

        const book = await Book.create(newBook);

        return response.status(201).send(book)
    } catch (error) {
        console.log(error)
        response.status(500).send({message : error.message})
    }
})

// Get all books from db
router.get('/', async (request, response) =>{
    try {

        const books = await Book.find({})

        return response.status(200).json({
            count: books.length,
            data: books
        })
        
    } catch (error) {
        console.log(error)
        response.status(500).send({message : error.message})
    }
})

// Get one book from db by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Find the book by ID
        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route for update book
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message: "All fields not fullfiled for the book"})
        }
        const { id } = request.params;

        // Find the book by ID
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(500).send({message : "Update Sucessful"});
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});


// Route for delete book
router.delete('/:id', async (request, response) => {
    try {
       
        const { id } = request.params;

        // Find the book by ID
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(500).send({message : "Delete Sucessful"});
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

export default router