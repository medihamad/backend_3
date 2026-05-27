// to create an express app we need to import express

const express = require('express');

// we need to use the dotenv to access the .env file
const route = require('./Routes/studentRoute');
const connectDB = require('./config/db');
require('dotenv').config();

// we will use this port to tell the app on which port to listen for traffic or request

const port = process.env.PORT;


/*
we need to create an instance of the server
this express function contains all the methods needed for our app
*/

const app = express();

connectDB();

//middleware section

// we need a middleware to make express understand json

app.use(express.json());

//routing

app.use('/api/v1', route);
// run the server

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})