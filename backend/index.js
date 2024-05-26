import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
// app.use(cors({
    //     origin: "http://localhost:3000",
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     allowedHeaders: ['Content-Type']
    // }));
    
    const app = express();
    app.use(cors());

//Middleware for parsing req body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(`Our PORT is = ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
