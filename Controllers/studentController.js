/*
    in this file we need to export our model then combine it with our logic
    - create student
    - get all student
    - get one student
    - update student
    - delete student

*/

//importing the student model

const Student = require('../Models/Student');

// 1. create student

const createStudent = async (req, res) => {
    /*
        - to create a student we need the following
        1. get details from the the user using (request object)
        2. validate the details
        3. use try and catch with student model to create the student
        4. respond to use the user if everything is fine
    */

        //1.
        const { name, age } = req.body;
        //2.
        if(!name || !age ) res.status(400).json({
            messsage: 'name and age are required'
        })
        //3.
        try{
            //create student
            const student = await Student.create({
                name,
                age
            })
        }
        catch(error){
            res.status(500).json({
                message: error.message
            })
        }

        res.status(200).json({
            message: 'Student inserted successfully',
            data: student
        })
}

