import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors';

const app=express();

// Middleware
app.use(express.json());

// Miiddleware for handling CORS policy
// Option 1:allow all origins with default cors(*)
app.use(cors());
// Option 2:allow custom origins
// app.use(
//     cors({
//         origin:'http://localhost3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// );

app.get("/", (request,response)=>{
    console.log(request);
    return response.status(234).send('Hey');
});

app.use('/books',booksRoute);

console.log('Starting the backend...');

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT,() => {
        console.log(`App is listening on PORT: ${PORT}`)
    });
})
.catch((error)=>console.log("Mongoo error:",error));