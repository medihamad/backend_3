/*
in this file we are going to create a model for the student api

- to create a model we need mongoose and a schema
*/

//importing moongse

const mongoose = require('mongoose');

//create schema for the student

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    course: {
        type: String,
        default: 'Full stack'
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

// we need to create a model using the student schema

module.exports = mongoose.model('Student', studentSchema);