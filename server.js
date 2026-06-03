// to create an express app we need to import express

const express = require('express');

// we need to use the dotenv to access the .env file
const route = require('./Routes/studentRoute');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid')
const fs = require('fs');

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

//app.use(uuidv4)
app.use(cookieParser());
app.use(session({
    secret: String(getUuid()),
    resave: false,
    saveUninitialized: true
}))
app.use(express.json());

//routing

async function getUuid(){
    await uuidv4()
    console.log(uuidv4())
    return uuidv4()
}

app.get('/set-cookie', (req, res)=>{
    res.cookie('username', 'medi', {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    res.status(201).json({
        message: 'cookie created'
    })
})

app.get('/get-cookie', (req, res)=>{
    const username = req.cookies.username;

    res.status(200).json({
        username
    })


})

app.get('/clear-cookie', (req, res)=>{
    res.clearCookie('username')

    res.status(200).json({
        message: 'cookie deleted'
    })
})

//session

app.get('/set-session', (req, res)=>{
    req.session.user = {
        id: uuidv4(),
        name: 'medi'
    }

    res.status(201).json({
        message: 'session created'
    })
})

app.get('/get-session', (req, res)=>{
    res.status(200).json({
        user: req.session?.user
    })

})


app.use('/api/v1', route);
// run the server

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})